import json

import boto3

from src.person import DynamoPerson


class PersonAction:
    def __init__(self, args: dict, action: str):
        self.args = args
        self.action = action


resource = boto3.resource('dynamodb')
dynamoPerson = DynamoPerson(resource, 'Person')


def lambda_handler(event, _):
    person_act = PersonAction(**event)
    to_call = getattr(dynamoPerson, person_act.action, None)
    if not to_call:
        raise RuntimeError(f'Invalid method {person_act.action}')
    result_nullable = to_call(**person_act.args)

    result = result_nullable if result_nullable else "None"
    json_str = json.dumps([vars(ob) for ob in result]) if isinstance(result, list) else json.dumps(vars(result))

    return {
        'body': json_str
    }

if __name__ == '__main__':
    # event = {"action": "scan",
    #          "args": {"field": "nickname", "value":"Child"}
    #          }
    event = {"action": "retrieve", "args": {"sid": "8e1826f5-a0c8-428e-824f-e334d6d5e4df"}}
    event = {}
    res = lambda_handler(event, None)
    print(json.dumps(res))