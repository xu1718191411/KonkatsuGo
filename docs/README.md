config.jsは.gitignoreに入ってあるので
docs/config.jsを作って、以下の内容を追加してください
var configData = {
    config: {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: ""
    }
}

reference: