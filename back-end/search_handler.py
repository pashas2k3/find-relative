import json

import boto3

from src.relation import DynamoRelation
from src.search import findPath


class SearchAction:
    def __init__(self, start: str, end: str, ):
        self.start = start
        self.end = end


resource = boto3.resource('dynamodb')
dynamoRelation = DynamoRelation(resource, 'Person')


def lambda_handler(event, _):
    search_act = SearchAction(**event)

    path = findPath(search_act.start, search_act.end, dynamoRelation.neighbors)
    return {
        'body': json.dumps(path) if path else "None"
    }
