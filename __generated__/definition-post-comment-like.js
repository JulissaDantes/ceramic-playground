// This is an auto-generated file, do not edit manually
export const definition = {"models":{"Comment":{"interface":false,"implements":[],"id":"kjzl6hvfrbw6c8i5meqkiexd114ugji00kd7w6t2z9fj7ma5iwiopnnov30ljhx","accountRelation":{"type":"list"}},"Like":{"interface":false,"implements":[],"id":"kjzl6hvfrbw6c6kle3bdt2wo6wct95dc2jmiek022pds9q1kp85u8ylei8dlqgu","accountRelation":{"type":"set","fields":["postID"]}},"Post":{"interface":false,"implements":[],"id":"kjzl6hvfrbw6c86rvvsduxvv86igil9lc0ulg1b0fkilfjft28h364zabnfinl8","accountRelation":{"type":"list"}}},"objects":{"Comment":{"text":{"type":"string","required":true,"immutable":false},"postID":{"type":"streamid","required":true,"immutable":false},"post":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c86rvvsduxvv86igil9lc0ulg1b0fkilfjft28h364zabnfinl8","property":"postID"}}},"Like":{"postID":{"type":"streamid","required":true,"immutable":true},"post":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c86rvvsduxvv86igil9lc0ulg1b0fkilfjft28h364zabnfinl8","property":"postID"}}},"Post":{"body":{"type":"string","required":true,"immutable":false},"edited":{"type":"datetime","required":false,"immutable":false},"created":{"type":"datetime","required":true,"immutable":false}}},"enums":{},"accountData":{"commentList":{"type":"connection","name":"Comment"},"like":{"type":"set","name":"Like"},"likeList":{"type":"connection","name":"Like"},"postList":{"type":"connection","name":"Post"}}}