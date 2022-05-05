function toggleCommentBar(lectureNo, toggle) {
    let element = document.getElementById("submit-bar-no"+lectureNo);
    element.style.display = ((toggle) ? "block" : "none");
}

function toggleReplyBar(lectureNo, commentNo, toggle) {
    let element = document.getElementById(`lecture-${lectureNo}-comment-${commentNo}`);
    element.style.display = ((toggle) ? "block" : "none");
}

function textareaResize(obj) {
    obj.style.height = "1px";
    obj.style.height = obj.scrollHeight+"px";
}