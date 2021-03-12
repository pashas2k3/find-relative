from collections import deque
from queue import PriorityQueue
# Find the shortest path with vanilla BFS or Dijkstra

# Cost of each relation is defined by relation typ

# Assuming 6 degrees of separation and taking a factor of 5 for connection
from typing import List, Callable

from src.relation import Relation, RelationType

MAX_DIST = 30


def findPath(start: str, end: str, get_nbhrs: Callable[[str], List[Relation]]) -> List[str]:
    # Using BFS - change to Dijkstra's later

    child2Parent: dict = dict()
    visited: set = set()
    queue = deque()

    queue.append((start, None))

    while len(queue) != 0:
        curr, parent = queue.pop()
        if curr not in visited:
            relations: List[Relation] = get_nbhrs(curr)
            nbhrs = [relation.destId for relation in relations]
            for nbhr in nbhrs:
                queue.append((nbhr, curr))

            visited.add(curr)
            child2Parent[curr] = parent
        if curr == end:
            break

    # Return the path from child 2 parent as a list

    def _revPath() -> List[str]:
        rev = end
        revList = []
        while rev != start:
            if rev not in child2Parent.keys():
                return []
            next = child2Parent[rev]
            revList.append(rev)
            rev = next
        revList.append(start)
        return revList

    retList = _revPath()
    retList.reverse()

    return retList


# if __name__ == "__main__":
#     relDict: dict[str, List[Relation]] = {
#         '1': [Relation('1', RelationType.child, '2')],
#         '2': [Relation('2', RelationType.parent, '1'), Relation('2', RelationType.parent, '3')],
#         '3': [Relation('3', RelationType.parent, '2')]
#     }
#
#
#     def _get_nbhrs(src: str): return relDict[src]
#
#
#     path = findPath('1', '3', _get_nbhrs)
#     print(*path, sep='->')
