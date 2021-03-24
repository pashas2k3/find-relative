import boto3
from boto3.dynamodb.conditions import Attr

from src.person import DynamoPerson, Person
from src.relation import DynamoRelation, Relation, RelationType
from src.search import findPath

if __name__ == '__main__':
    resource = boto3.resource('dynamodb')
    dynamoPerson = DynamoPerson(resource, 'Person')
    dynamoRelation = DynamoRelation(resource, 'Relation')

    # table = resource.Table('Person')
    # table.scan(FilterExpression=Attr('nickname').eq('Jon'))
    p1 = Person('John Doe', 'Jons', '2000-01-01', 'John Doe')
    dynamoPerson.store(p1)
    p2 = Person('Jane Doe', 'Janes', '2000-01-01', 'Jane Doe')
    dynamoPerson.store(p2)
    p3 = Person('Child Doe', 'Child', '2000-01-01', 'Child Doe')
    dynamoPerson.store(p3)

    person = dynamoPerson.retrieve(p1.uid)
    persons = dynamoPerson.scan('nickname', 'Jons')

    dynamoRelation.store(Relation(p1.uid, RelationType.spouse, p2.uid))
    dynamoRelation.store(Relation(p2.uid, RelationType.spouse, p1.uid))
    dynamoRelation.store(Relation(p1.uid, RelationType.parent, p3.uid))
    dynamoRelation.store(Relation(p1.uid, RelationType.child, p3.uid))
    # dynamoRelation.store(Relation(p2.id, RelationType.parent, p3.id))

    relations = dynamoRelation.neighbors(p1.uid)

    path = findPath(p2.uid, p3.uid, dynamoRelation.neighbors)
    namedPath = [dynamoPerson.retrieve(p).name for p in path]
    print(*namedPath, sep='->')