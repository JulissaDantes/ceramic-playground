// This is an auto-generated file, do not edit manually
export const definition = {"models":{"BasicProfile":{"id":"kjzl6hvfrbw6c9vstjzqk1gq8zs3dsezcnx55j7b3n852rwhw264wbno3w6onsj","accountRelation":{"type":"single"}},"Posts":{"id":"kjzl6hvfrbw6c6di346hnvr02cd7bdbkudqqfe5tvdes7alsqiyjiiga0sf1b3h","accountRelation":{"type":"list"}},"Following":{"id":"kjzl6hvfrbw6c8bbaofc8k1m0nlnxwdtef1uy1hkux984cffo6gxlgr9mrsxp89","accountRelation":{"type":"list"}},"Comments":{"id":"kjzl6hvfrbw6c5iryabp70zy2n38ttzp6zmoljcznkn1y5s6e7m982se9xmf0m9","accountRelation":{"type":"list"}}},"objects":{"BasicProfile":{"name":{"type":"string","required":true},"emoji":{"type":"string","required":false},"gender":{"type":"string","required":false},"username":{"type":"string","required":true},"description":{"type":"string","required":false},"author":{"type":"view","viewType":"documentAccount"},"posts":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c6di346hnvr02cd7bdbkudqqfe5tvdes7alsqiyjiiga0sf1b3h","property":"profileId"}}},"Posts":{"tag":{"type":"string","required":true,"indexed":true},"body":{"type":"string","required":true},"edited":{"type":"datetime","required":false,"indexed":true},"created":{"type":"datetime","required":true,"indexed":true},"profileId":{"type":"streamid","required":true},"author":{"type":"view","viewType":"documentAccount"},"profile":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c9vstjzqk1gq8zs3dsezcnx55j7b3n852rwhw264wbno3w6onsj","property":"profileId"}},"responses":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c5iryabp70zy2n38ttzp6zmoljcznkn1y5s6e7m982se9xmf0m9","property":"postId"}}},"Following":{"profileId":{"type":"streamid","required":true},"profile":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c9vstjzqk1gq8zs3dsezcnx55j7b3n852rwhw264wbno3w6onsj","property":"profileId"}}},"Comments":{"edited":{"type":"datetime","required":false,"indexed":true},"postId":{"type":"streamid","required":true},"comment":{"type":"string","required":true},"created":{"type":"datetime","required":true,"indexed":true},"profileId":{"type":"streamid","required":true},"post":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c6di346hnvr02cd7bdbkudqqfe5tvdes7alsqiyjiiga0sf1b3h","property":"postId"}},"profile":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c9vstjzqk1gq8zs3dsezcnx55j7b3n852rwhw264wbno3w6onsj","property":"profileId"}}}},"enums":{},"accountData":{"basicProfile":{"type":"node","name":"BasicProfile"},"postsList":{"type":"connection","name":"Posts"},"followingList":{"type":"connection","name":"Following"},"commentsList":{"type":"connection","name":"Comments"}}}