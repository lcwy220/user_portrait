# -*- coding: utf-8 -*-

"""
based on user activity, recommend to delete the user in portrait database

"""

import sys
import redis
from elasticsearch import Elasticsearch
from elasticsearch.helpers import scan

reload(sys)
sys.path.append('./../../')
from global_utils import ES_CLUSTER_FLOW1, R_CLUSTER_FLOW1

es = ES_CLUSTER_FLOW1
recommend_redis = R_CLUSTER_FLOW1

index_destination = "user_index_profile"
index_destination_doctype = "manage"

def search_low_number(low_range, index_name=index_destination, index_type=index_destination_doctype):
    query_body = {
        "query": {
            "filtered": {
                "query": {
                    "match_all": {}
                 },
                "filter": {
                    "range": {
                        "low_number":{
                            "lt": low_range
                        }
                    }
                }
            }
        }
    }

    results = es.search(index=index_name, doc_type=index_type, body=query_body)["hits"]["hits"]

    user_list = []
    for item in results:
        user_list.append(item['_id'])

    return user_list

if __name__ == "__main__":
    threshould = 4
    recommend_list = search_low_number(threshould) # recommended user to delete in portrait database
    if recommend_list:
        recommend_redis.lpush("recommend_delete_list", item for item in recommend_list) # lpush uid into a redis
    else:
        return None
