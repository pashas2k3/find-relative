from typing import List
from uuid import uuid4

from boto3.dynamodb.conditions import Attr, Key

class Person:
    def __init__(self, name: str, nickname: str, birthDate: str, maidenName: str, uid: str = None):
        def _validate(s: str):
            if not s:
                raise RuntimeError(f'Expected truthy, instead got s {s}')
            return s

        self.name = _validate(name)
        self.nickname = _validate(nickname)
        self.birthDate = _validate(birthDate)
        self.maidenName = _validate(maidenName)
        # self.hashId = hashlib.md5(("".join([name, nickname, birthDate, maidenName]).encode('utf-8'))).hexdigest()
        self.uid = uid if uid is not None else str(uuid4())


class DynamoPerson:
    def __init__(self, client, tablename):
        self.table = client.Table(tablename)

    def store(self, person: Person) -> None:
        d = vars(person)
        self.table.put_item(Item=d)
        # self.table.put_item(Item=d, ConditionExpression='attribute_not_exists(hashId)')

    def retrieve(self, sid: str) -> Person:
        res = self.table.get_item(Key={'uid': sid}).get('Item', None)
        # res = self.table.query(
        #     IndexName='uid-index',
        #     KeyConditionExpression=Key('uid').eq(sid))['Items'][0]
        return Person(**res) if res else None

    # TODO Pagination
    # TODO multiple value matching
    def scan(self, field, value) -> List[Person]:
        res = self.table.scan(FilterExpression=Key(field).eq(value)).get('Items', [])
        return [Person(**r) for r in res]

