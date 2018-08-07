// ユーザーDB

var userDb = {
    COLLECTION: "users",
    db: null,

    test_users: [{
            uid: 1,
            name: "太郎",
            sex: "male",
            lat: 35.160374,
            lng: 136.891119,
        },
        {
            uid: 2,
            name: "花子",
            sex: "female",
            lat: 35.159277,
            lng: 136.89242,
        },
        {
            uid: 3,
            name: "タケル",
            sex: "male",
            lat: 35.159304,
            lng: 136.893426,
        },
        {
            uid: 4,
            name: "アケミ",
            sex: "female",
            lat: 35.158340,
            lng: 136.893281,
        },
    ],


    // 初期化
    init: function () {
        this.db = firebase.firestore();
        usersRef = this.db.collection("users");
    },

    // 特定UIDのユーザー情報取得
    getUserData: function (uid, callback) {
        var docRef = this.db.collection(this.COLLECTION).doc(uid);
        docRef.get().then(function (doc) {
            callback(doc);
        }).catch(function (error) {
            console.log("Error getting document:", error);
            alert('DB Error : ' + error);
        });
    },

    // 範囲内のユーザー情報取得
    getAreaUsers: function (parm, callback) {
        callback(this.test_users);
    },

}