document.addEventListener("DOMContentLoaded", function () {
    const copyButton = document.querySelector(".copy-hash-btn");
    const hashContent = document.querySelector(".hash");

    copyButton.addEventListener("click", function () {
        const text = hashContent.textContent;

        navigator.clipboard.writeText(text).then(() => {
            alert("해시태그가 복사되었습니다!");
        }).catch(err => {
            console.error("클립보드 복사 실패:", err);
            alert("복사에 실패했어요. 브라우저 설정을 확인해주세요.");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".brand-tab-btn");
    const tabItems = document.querySelectorAll(".brand-tab-item");

    tabButtons[0].classList.add("active");
    tabItems[0].classList.add("static");

    tabButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            tabItems.forEach(item => item.classList.remove("static"));
            tabItems[index].classList.add("static");
        });
    });
});

let allReplies = [];
let currentPage = 1;
const pageSize = 8;

function renderRepliesPage(page) {
    const replyList = document.querySelector(".reply-list");
    replyList.innerHTML = "";

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageData = allReplies.slice(start, end);

    pageData.forEach(entry => {
        const li = document.createElement("li");
        li.classList.add("reply-item");
        li.innerHTML = `
            <p class="user-content">${entry.content}</p>
            <p class="user-number">
                <span>010</span>
                <span>-</span>
                <span class="display-middle-number">****</span>
                <span>-</span>
                <span class="display-last-number">${entry["last_number"]}</span>
            </p>
        `;
        replyList.appendChild(li);
    });

    renderPagination();
}

function renderPagination() {
    let paginationWrapper = document.querySelector(".pagination");
    if (!paginationWrapper) {
        paginationWrapper = document.createElement("div");
        paginationWrapper.className = "pagination";
        document.querySelector(".section-3-reply").appendChild(paginationWrapper);
    }

    const totalPages = Math.ceil(allReplies.length / pageSize);
    paginationWrapper.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.add("page-btn");
        if (i === currentPage) btn.classList.add("active");
        btn.addEventListener("click", () => {
            currentPage = i;
            renderRepliesPage(currentPage);
        });
        paginationWrapper.appendChild(btn);
    }
}

function loadReplies() {
    fetch("https://script.google.com/macros/s/AKfycbz0A_8BcTmki5OYoHI1hYHNQGHoYxEhg-UHKigxVihx5vzsj3271Zde6XCgFxwcJMnx/exec")
        .then(res => res.json())
        .then(data => {
            allReplies = data.reverse();
            renderRepliesPage(currentPage);
        })
        .catch(err => console.error("시트 로딩 실패:", err));
}


document.addEventListener("DOMContentLoaded", function () {
    loadReplies();
});


document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("input-userdata-btn");

    submitBtn.addEventListener("click", function () {
        const username = document.getElementById("username").value.trim();
        const first = document.getElementById("first-number").value.trim();
        const middle = document.getElementById("middle-number").value.trim();
        const last = document.getElementById("last-number").value.trim();
        const content = document.getElementById("reply-content").value.trim();

        if (!username || !first || !middle || !last || !content) {
            alert("모든 입력 항목을 작성해 주세요.");
            return;
        }

        const data = {
            username: username,
            first_number: first,
            middle_number: middle,
            last_number: last,
            content: content
        };

        const modal = document.createElement("div");
        modal.id = "loading-modal";
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100vw";
        modal.style.height = "100vh";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "9999";
        modal.style.color = "#fff";
        modal.style.fontSize = "1.5rem";
        modal.innerText = "잠시만 기다려주세요...";
        document.body.appendChild(modal);

        fetch("https://script.google.com/macros/s/AKfycbz0A_8BcTmki5OYoHI1hYHNQGHoYxEhg-UHKigxVihx5vzsj3271Zde6XCgFxwcJMnx/exec", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                alert("응원의 메시지가 등록되었습니다!");
                document.body.removeChild(modal);
                document.getElementById("username").value = "";
                document.getElementById("first-number").value = "";
                document.getElementById("middle-number").value = "";
                document.getElementById("last-number").value = "";
                document.getElementById("reply-content").value = "";

                loadReplies();
            })
            .catch((error) => {
                console.error("전송 실패:", error);
                alert("등록에 실패했습니다. 잠시 후 다시 시도해 주세요.");
                document.body.removeChild(modal);

            });
    });

});


document.addEventListener("DOMContentLoaded", function () {
    const snsInput = document.getElementById("sns-url-input");
    const snsSubmit = document.getElementById("sns-submit-btn");

    snsSubmit.addEventListener("click", function () {
        const snsUrl = snsInput.value.trim();

        if (!snsUrl) {
            alert("SNS 주소를 입력해 주세요.");
            return;
        }

        const data = {
            sns_url: snsUrl,
            timestamp: new Date().toISOString()
        };

        const modal = document.createElement("div");
        modal.id = "loading-modal";
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100vw";
        modal.style.height = "100vh";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "9999";
        modal.style.color = "#fff";
        modal.style.fontSize = "1.5rem";
        modal.innerText = "잠시만 기다려주세요...";
        document.body.appendChild(modal);

        fetch("https://script.google.com/macros/s/AKfycbyqfrFL4yrEjTeN0uAr7GYQhxdOyBmqQ_D7WzEtQv_WNCiM_zp0ajAOVWfTa0BOE8Nx5A/exec", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                alert("인증 주소가 성공적으로 등록되었습니다.");
                document.body.removeChild(modal);
                snsInput.value = "";
            })
            .catch((error) => {
                console.error("SNS 주소 등록 실패:", error);
                alert("등록에 실패했습니다. 잠시 후 다시 시도해 주세요.");
                document.body.removeChild(modal);
            });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const scrollButtons = document.querySelectorAll(".direct-scroll-btn");
    const targetSections = [
        document.querySelector(".section-3"),
        document.querySelector(".section-4"),
        document.querySelector(".section-5"),
        document.querySelector(".section-6")
    ];

    scrollButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const target = targetSections[index];
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });
});