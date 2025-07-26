import boto3
import os
import json
from decimal import Decimal

table_name = os.environ['STORAGE_MENUTABLE_NAME']

dynamodb = boto3.resource('dynamodb')
table    = dynamodb.Table(table_name)

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)

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
        if method == 'GET' and path == '/menu':
            response = table.scan()
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(response['Items'], cls=DecimalEncoder)
            }

        # elif method == 'GET' and path.startswith('/menu/'):
        #     item_id = path.split('/')[-1]
        #     response = table.get_item(Key={'id': item_id})
        #     return {
        #         'statusCode': 200,
        #         'headers': headers,
        #         'body': json.dumps(response.get('Item', {}))
        #     }
            
        elif method == 'POST' and path == '/menu':
            body = json.loads(event['body'])
            if 'price' in body:
                body['price'] = Decimal(str(body['price']))
            table.put_item(Item=body)
            return {
                'statusCode': 201,
                'headers': headers,
                'body': json.dumps(body, cls=DecimalEncoder)
            }
            
        # elif method == 'PUT' and path.startswith('/menu/'):
        #     item_id = path.split('/')[-1]
        #     body = json.loads(event['body'])
        #     body['id'] = item_id
        #     table.put_item(Item=body)
        #     return {
        #         'statusCode': 200,
        #         'headers': headers,
        #         'body': json.dumps(body)
        #     }
            
        # elif method == 'DELETE' and path.startswith('/menu/'):
        #     item_id = path.split('/')[-1]
        #     table.delete_item(Key={'id': item_id})
        #     return {
        #         'statusCode': 204,
        #         'headers': headers,
        #         'body': ''
        #     }
            
        # elif method == 'OPTIONS':
        #     return {
        #         'statusCode': 200,
        #         'headers': headers,
        #         'body': ''
        #     }
            
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