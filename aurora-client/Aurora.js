const scriptName = "Aurora.js";

/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
function response (room, msg, sender, isGroupChat, replier, imageDB, packageName) {

    const resourceUrl = "http://zoz0312.com:8822";
    const myRoom = [
        '롤키웨이(LoLky Way)',
        '오로라개발방'
    ];

    if (!myRoom.includes(room)) {
        return;
    }

    let svcCd = "/user-custom-command";

    const flag = msg.trim()[0] === "/";
    if (flag){
        svcCd = "/command-manager";
    }

    const res = org.jsoup.Jsoup.connect(resourceUrl + svcCd)
        .data('room', room)
        .data('msg', msg.trim())
        .data('sender', sender.split('/')[0])
        .data('isGroupChat', isGroupChat)
        .ignoreHttpErrors(true)
        .ignoreContentType(true)
        .post()
        .outputSettings().prettyPrint(false);

    if (res.success || flag) {
        replier.reply(res.message);
    }

}

/**
 * 아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
 */
function onCreate(savedInstanceState, activity) {
    var textView = new android.widget.TextView(activity);
    textView.setText("Hello, World!");
    textView.setTextColor(android.graphics.Color.DKGRAY);
    activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}
