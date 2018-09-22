// ユーザーDB

var userDb = {
    COLLECTION: "users",
    COLLECTIONCOMPLIMENT:"compliment",
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
    getUserData: function (uid,cb) {
        this.db.collection(this.COLLECTION).doc(uid).get().then(function(res){
            cb(res)
        })
    },

    // ユーザー情報セット
    setUserData: function (uid, data,cb) {
        data.timestamp = new Date();
        // console.log('setUserData :');
        // console.log(uid);
        // console.log(data);
        this.db.collection(this.COLLECTION).doc(uid).set(data)
            .then(function () {
                console.log("Document successfully written!");
                cb(true)
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
                cb(false)
            });
    },

    // 範囲内のユーザー情報取得
    getAreaUsers: function (parm, cb) {
        this.db.collection(this.COLLECTION)
            .get()
            .then(function (querySnapshot) {
                cb(querySnapshot);
            });
    },

    compliment:function(uid,target,cb){

        userDb.checkComliment(uid,target,function(shouldDoTheCompliment){
            if(shouldDoTheCompliment){
                userDb.doComliment(uid,target,function(error){
                    if(error == null){
                        cb(true)
                        console.log("conguraduation!you have given a successful comliment")
                    }else{
                        
                        console.log(error)
                    }
                })
            }else{
                cb(false)
            }
        })
    },

    checkComliment:function(uid,target,cb){
        this.db.collection(this.COLLECTIONCOMPLIMENT).where("uid","==",uid).where("target","==",target).get().then(function(querySnapshot){

            if(!querySnapshot.empty){
                cb(false)
                console.log("checkComliment:not empty")
            }else{
                cb(true)
                console.log("checkComliment:empty")
                //not yet give a comliment
            }
        }).catch(function(error){
            cb(false)
            console.log("checkComliment:error")
        })
    },

    doComliment:function(uid,target,cb){
        this.db.collection(this.COLLECTIONCOMPLIMENT).add({
            uid:uid,
            target:target
        }).then(function(){
            console.log("doComliment"+"success")
            cb(null)
        }).catch(function(error){
            console.log("doComliment"+"failure")
            cb(error)
        })
    },

    checkMatching:function(uid,target,cb){
        userDb.checkComliment(uid,target,function(hasDoneTheCompliment){
                if(hasDoneTheCompliment){
                    userDb.checkComliment(target,uid,function(successMatched){
                       cb(true)
                    })
                }
        })
    }
}