#-*- coding:utf-8 -*-
'''
use to save parameter
'''
#for all
DAY = 24*3600
HALF_HOUR = 1800
FOUR_HOUR = 3600*4
MAX_VALUE = 99999999


#attribute: IP
IP_TIME_SEGMENT = 4*3600 # return every 4 hour statistic result for ip information
IP_TOP = 5 # return Top-5 ip for every time segment
IP_CONCLUSION_TOP = 2 # return job/home ip with top2

#attribute: geo
GEO_COUNT_THRESHOLD = 5

#attribute: sentiment
SENTIMENT_DICT = {'1':u'积极', '2':u'悲伤', '3':u'愤怒', '0': u'中性'}

#attribute: online_pattern
PATTERN_THRESHOLD = 3

#activeness threshould 
LOW_INFLUENCE_THRESHOULD = 200

#attribute: domain
domain_en2ch_dict = {'university':u'高校', 'homeadmin':u'境内机构', 'abroadadmin':u'境外机构', \
                     'homemedia':u'媒体', 'abroadmedia':u'境外媒体', 'folkorg':u'民间组织',\
                     'lawyer':u'法律机构及人士', 'politician':u'政府机构及人士', 'mediaworker':u'媒体人士',\
                     'activer':u'活跃人士', 'grassroot':u'草根', 'other':u'其他', 'business':u'商业人士'}

#attribtue: topic
topic_en2ch_dict = {'art':u'文体类_娱乐','computer':u'科技类','economic':u'经济类', \
                    'education':u'教育类','environment':u'民生类_环保', 'medicine':u'民生类_健康',\
                    'military':u'军事类','politics':u'政治类_外交','sports':u'文体类_体育',\
                    'traffic':u'民生类_交通','life':u'其他类','anti-corruption':u'政治类_反腐',\
                    'employment':u'民生类_就业','fear-of-violence':u'政治类_暴恐',\
                    'house':u'民生类_住房','law':u'民生类_法律','peace':u'政治类_地区和平',\
                    'religion':u'政治类_宗教','social-security':u'民生类_社会保障'}

#attribtue:retweet/be_retweet/comment/be_comment/bidirect_interaction
SOCIAL_DEFAULT_COUNT = '20'

#attribute:sentiment trend default time type
SENTIMENT_TREND_DEFAULT_TYPE = 'day'
DEFAULT_SENTIMENT = '1' #happy, angry, sad


#attribute:psy desciption field
PSY_DESCRIPTION_FIELD = ['anger', 'anx', 'sad', 'negemo']
psy_en2ch_dict = {'anger': u'愤怒情绪', 'anx': u'焦虑情绪', 'sad': u'悲伤情绪', 'negemo':u'消极情绪'}
psy_description_dict = {
        '0':u'与个人历史水平持平,但是高于全库平均水平',
        '1':u'高于个人历史水平, 但与全库平均水平持平',
        '2':u'高于个人历史水平及全库平均水平',
        '3':u'心理状态平稳正常'
        }

# recommend out threshould
RECOMMEND_OUT_THRESHOULD = 30


#attribute: influence index and conclusion
INFLUENCE_RETWEETED_THRESHOLD = 500
INFLUENCE_COMMENT_THRESHOLD = 500
INFLUENCE_TAG = {
         "0": "昨日无影响", # 无数据
         "1": "热门信息发布者", # 原创微博的被转发量和评论量高
         "2": "热门信息传播者", # 转发微博的被转发量和评论量高
         "3": "热门信息发布者和传播者", # 同时高
         "4": "影响力低"
    }

#attribtue: influence trend conclusion
INFLUENCE_TREND_SPAN_THRESHOLD = 400
INFLUENCE_TREND_AVE_MIN_THRESHOLD = 500
INFLUENCE_TREND_AVE_MAX_THRESHOLD = 900
INFLUENCE_TREND_DESCRIPTION_TEXT = {
        '0': u'影响力较高,且保持平稳',
        '1': u'影响力较高,且波动性较大',
        '2': u'影响力一般,且保持平稳',
        '3': u'影响力一般,且波动性较大',
        '4': u'影响力较低,且保持平稳',
        '5': u'影响力较低,且波动性较大'
    }

#attribute: activeness trend conclusion
ACTIVENESS_TREND_SPAN_THRESHOLD = 30
ACTIVENESS_TREND_AVE_MIN_THRESHOLD = 40
ACTIVENESS_TREND_AVE_MAX_THRESHOLD = 70
ACTIVENESS_TREND_DESCRIPTION_TEXT = {
        '0': u'活跃度较高, 且保持平稳',
        '1': u'活跃度较高, 且波动性较大',
        '2': u'活跃度一般, 且保持平稳', 
        '3': u'活跃度一般, 且波动性较大',
        '4': u'活跃度较低, 且保持平稳',
        '5': '活跃度较低, 且波动性较大'
    }

ACTIVENESS_TREND_TAG_VECTOR = {
         '0': u'活跃度高且平稳',
         '1': u'活跃度高且波动性大',
         '2': u'活跃度一般且平稳',
         '3': u'活跃度一般且波动性大',
         '4': u'活跃度低且平稳',
         '5': '活跃度低且波动性大'
    }

#cron/text_attribute/topic
TOPIC_ABS_PATH = '/home/ubuntu8/huxiaoqian/user_portrait_151220/user_portrait/user_portrait/cron/model_file/topic'

#cron/text_attribute/domain
DOMAIN_ABS_PATH = '/home/ubuntu8/huxiaoqian/user_portrait_151220/user_portrait/user_portrait/cron/model_file/domain'

#cron/text_attribute/psy
PSY_ABS_PATH = '/home/ubuntu8/huxiaoqian/user_portrait_151220/user_portrait/user_portrait/cron/model_file/psy'

#cron/text_attribute/event
EVENT_ABS_PATH = '/home/ubuntu8/huxiaoqian/user_portrait_151220/user_portrait/user_portrait/cron/model_file/event'

# pre-influence index
pre_influence_index = "bci_"
influence_doctype = "bci"

# conclusion of history influence
INFLUENCE_LENTH = 30
INFLUENCE_LEVEL = [200, 500, 700, 900, 1100]
ACTIVENESS_LEVEL = [0.5, 1, 1.5, 2]
PRE_ACTIVENESS = "activeness_"
INFLUENCE_CONCLUSION = {
    "0": "该用户近期无影响力",
    "1": "该用户近期影响力很小",
    "2": "该用户近期影响力一般",
    "3": "该用户近期影响力持续较高",
    "4": "该用户近期影响力较高，波动较大",
    "5": "该用户近期影响力持续很高",
    "6": "该用户近期影响力很高，波动性大",
    "7": "该用户影响力接近意见领袖",
    "8": "该用户影响力巨大"
    }

CURRNET_INFLUENCE_THRESHOULD = [200,500,700,900,1100]
CURRENT_INFLUENCE_CONCLUSION = {
    "0": "无影响力",
    "1": "影响力较低",
    "2": "影响力一般",
    "3": "影响力较高",
    "4": "影响力高",
    "5": "影响力极高"
    }

ACTIVENESS_CONCLUSION = {
    "0": "该用户近期没有活跃",
    "1": "该用户近期不太活跃",
    "2": "该用户近期活跃程度一般",
    "3": "该用户近期较为活跃",
    "4": "该用户近期非常活跃",
    "5": "该用户近期极其活跃"
    }

BCI_LIST = ["origin_weibo_number", "origin_weibo_number", "retweeted_weibo_number", "retweeted_weibo_retweeted_brust_average", "origin_weibo_retweeted_average_number", "origin_weibo_comment_top_number", \
           "origin_weibo_comment_brust_average", "retweeted_weibo_top_retweeted_id", "retweeted_weibo_comment_top_number", "origin_weibo_top_comment_id", "retweeted_weibo_retweeted_total_number", "retweeted_weibo_retweeted_average_number", \
           "origin_weibo_retweeted_total_number", "retweeted_weibo_top_comment_id", "origin_weibo_top_retweeted_id", "origin_weibo_comment_average_number", "origin_weibo_retweeted_brust_average", "origin_weibo_retweeted_top_number", \
           "retweeted_weibo_retweeted_top_number","user_index", "retweeted_weibo_comment_total_number", "retweeted_weibo_comment_brust_average", "origin_weibo_comment_total_number", "retweeted_weibo_comment_average_number"]


INFLUENCE_TOTAL_THRESHOULD = [1000, 1000, 1000, 1000]
INFLUENCE_TOTAL_LIST = ['origin_weibo_retweeted_total_number','origin_weibo_comment_total_number','retweeted_weibo_retweeted_total_number','retweeted_weibo_comment_total_number']
INFLUENCE_TOTAL_CONCLUSION = ['原创微博被转发量高', '原创微博被评论量高', '转发微博被转发量高', '转发微博被评论量高']
UNDERLINE_CONCLUSION = ['热门信息发布者', '发布的热门信息容易引发公众热议', '热门信息传播者', '传播的热门信息容易引发公众热议']
INFLUENCE_BRUST_THRESHOULD = [100, 100,100, 100]
INFLUENCE_BRUST_LIST = ['origin_weibo_retweeted_brust_average','origin_weibo_comment_brust_average','retweeted_weibo_retweeted_brust_average','retweeted_weibo_comment_brust_average']
INFLUENCE_BRUST_CONCLUSION = ['传播速度快', '评论速度快', '传播速度快', '评论速度快']

#group detect: query information---single/multi
DETECT_QUERY_ATTRIBUTE = ['location', 'domain', 'topic_string', 'keywords_string', 'hashtag', \
                          'activity_geo', 'tendency', 'tag', 'remark']
DETECT_QUERY_ATTRIBUTE_MULTI = ['topic_string', 'keywords_string', 'hashtag', 'activity_geo']
DETECT_QUERY_STRUCTURE = ['retweet', 'comment', 'hop']
DETECT_QUERY_FILTER = ['count', 'influence', 'importance']
DETECT_DEFAULT_WEIGHT = 0.5
DETECT_DEFAULT_MARK = '0'
DETECT_DEFAULT_COUNT = 100
DETECT_FILTER_VALUE_FROM = 50
DETECT_FILTER_VALUE_TO = 100
DETECT_ITER_COUNT = 100
DETECT_TEXT_FUZZ_ITEM = ['text']
DETECT_TEXT_RANGE_ITEM = ['timestamp']
MAX_DETECT_COUNT = 900
DETECT_COUNT_EXPAND = 3
MAX_PROCESS = 100
#group detect: attribute detect
DETECT_ATTRIBUTE_FUZZ_ITEM = ['location', 'activity_geo', 'keywords_string','hashtag', 'remark']
DETECT_ATTRIBUTE_MULTI_ITEM = ['topic_string', 'domain']
DETECT_ATTRIBUTE_SELECT_ITEM = ['tendency', 'tag']
DETECT_PATTERN_FUZZ_ITEM = ['geo', 'ip']
DETECT_PATTERN_SELECT_ITEM = ['message_type', 'sentiment']
DETECT_PATTERN_RANGE_ITEM = ['timestamp']
#group detect: event detect
DETECT_EVENT_ATTRIBUTE = ['topic_string', 'domain']
DETECT_EVENT_TEXT_FUZZ_ITEM = ['text']
DETECT_EVENT_TEXT_RANGE_ITEM = ['timestamp']
#identify user attribute list
IDENTIFY_ATTRIBUTE_LIST = ['domain', 'uid', 'hashtag_dict', 'importance', 'influence', 'domain_v3', \
        'online_pattern', 'keywords_string', 'topic', 'activity_geo', 'uname', 'hashtag', 'keywords', 'fansnum', \
        'psycho_status', 'tendency', 'photo_url', 'verified', 'statusnum', 'gender', 'topic_string',\
        'activeness', 'location', 'activity_geo_dict', 'friendsnum', 'group', 'remark']
