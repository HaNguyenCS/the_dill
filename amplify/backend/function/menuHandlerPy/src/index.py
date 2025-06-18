import json
import boto3
from boto3.dynamodb.conditions import Key

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('menuTable-dev')  # Replace with your actual table name

def handler(event, context):
    print('received event:', event)
    
    method = event['httpMethod']
    path = event['path']
    headers = {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
    }
    
    try:
        # GET /menu - List all items
        if method == 'GET' and path == '/menu':
            response = table.scan()
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(response.get('Items', []))
            }
            
        # GET /menu/{id} - Get single item
        elif method == 'GET' and path.startswith('/menu/'):
            item_id = path.split('/')[-1]
            response = table.get_item(Key={'id': item_id})
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(response.get('Item', {}))
            }
            
        # POST /menu - Create new item
        elif method == 'POST' and path == '/menu':
            body = json.loads(event['body'])
            table.put_item(Item=body)
            return {
                'statusCode': 201,
                'headers': headers,
                'body': json.dumps(body)
            }
            
        # PUT /menu/{id} - Update item
        elif method == 'PUT' and path.startswith('/menu/'):
            item_id = path.split('/')[-1]
            body = json.loads(event['body'])
            body['id'] = item_id
            table.put_item(Item=body)
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(body)
            }
            
        # DELETE /menu/{id} - Delete item
        elif method == 'DELETE' and path.startswith('/menu/'):
            item_id = path.split('/')[-1]
            table.delete_item(Key={'id': item_id})
            return {
                'statusCode': 204,
                'headers': headers,
                'body': ''
            }
            
        # OPTIONS - Handle CORS preflight
        elif method == 'OPTIONS':
            return {
                'statusCode': 200,
                'headers': headers,
                'body': ''
            }
            
        else:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({'error': 'Not Found'})
            }
            
    except Exception as e:
        print('Error:', str(e))
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': str(e)})
        }