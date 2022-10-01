from youtube_transcript_api import YouTubeTranscriptApi
from operator import itemgetter
def getTranscript(video_id):
    transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
    transcript = transcript_list.find_transcript(['en'])
    transcript2 = transcript.fetch()
    x=''
    res = list(map(itemgetter('text'), transcript2))
    for i in res:
        x+=' '+i;
    print(x)
    return x;

getTranscript('vAoB4VbhRzM')