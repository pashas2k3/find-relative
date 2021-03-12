from enum import Enum
from typing import Union

from boto3.dynamodb.conditions import Key


class RelationType(Enum):
    parent = 1
    child = 2
    spouse = 3


class Relation:
    def __init__(self, srcId: str, relation: Union[RelationType, str], destId: str):

        self.srcId = srcId
        self.relation = relation.name if isinstance(relation, RelationType) else relation
        # Validate relation is from enum types
        self.destId = destId

class DynamoRelation:
    def __init__(self, client, tableName: str):
        self.table = client.Table(tableName)

    def store(self, relation: Relation) -> None:
        d = vars(relation)
        self.table.put_item(Item=d)

    def neighbors(self, id: str):
        l = self.table.query(KeyConditionExpression=Key('srcId').eq(id)).get('Items', [])
        return [Relation(**r) for r in l]

