import json

import boto3

from src.relation import DynamoRelation


class RelationAction:
    def __init__(self, args: dict, action: str):
        self.args = args
        self.action = action


resource = boto3.resource('dynamodb')
dynamoRelation = DynamoRelation(resource, 'Person')


def lambda_handler(event, _):
    relation_act = RelationAction(**event)
    to_call = getattr(dynamoRelation, relation_act.action, None)
    if not to_call:
        raise RuntimeError(f'Invalid method {relation_act.action}')
    result = to_call(**relation_act.args)

    return {
        'body': json.dumps(result) if result else "None"
    }
