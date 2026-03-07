// Copy templates
const copyMessages = [
  {
    title: "【商品変更】",
    content: `ご連絡ありがとうございます。

承知いたしました。
○○を○○へ変更させていただきます。

変更後の内容で発送準備を進めさせていただきます。
商品到着まで今しばらくお待ちくださいませ。

どうぞよろしくお願いいたします。`
  },
  {
    title: "【発送時期】",
    content: `ご連絡ありがとうございます。

ご注文の商品は○○発送予定です。
到着まで今しばらくお待ちくださいませ。

何卒よろしくお願いいたします。`
  },
  {
    title: "【キャンセル】",
    content: `ご連絡ありがとうございます。

かしこまりました。
ご注文はキャンセルさせていただきました。

よろしくお願いいたします。`
  },
  {
    title: "【予約商品】",
    content: `ご連絡ありがとうございます。

ご注文内容を確認いたしましたところ、ご購入商品の中に「予約販売（3月下旬より順次発送）」の商品が含まれております。
そのため、現在は入荷待ちの状況でございまして、まだ発送が完了しておりません。

商品が入荷次第、速やかに発送させていただきます。
お届けまで今しばらくお時間を頂戴いたしますが、何卒ご理解いただけますと幸いです。

どうぞよろしくお願いいたします。`
  },
  {
    title: "【商品不足】",
    content: `ご連絡いただきありがとうございます。

この度は商品が不足していたとのこと、誠に申し訳ございません。
おそらく倉庫での梱包ミスかと思われます。

不足しているシール帳1点につきましては、至急1セットを再発送させていただきます。
商品到着まで今しばらくお待ちいただけますと幸いです。

この度はご迷惑をおかけし、誠に申し訳ございませんでした。
何卒よろしくお願いいたします。`
  },
  {
    title: "【GPT：メルカリ評価】",
    content: `# 乐天评论回复模板 现在你是我们乐天店铺的客服，你需要把我给你的评论进行回复，要求回复的内容要与客户的评论挂钩，态度真诚，要考虑到别的客户会看到，但是如果客户提到说要返金或者反品的不要直接同意，要引导客户跟我们お問い合わせ,但也不是所有内容都要お問い合わせ,免得客服工作量增加。 
所有尽量说我们的优点和改进方向，请给出日语和中文两个版本，稍后我会给出模板和我们店铺的产品的信息 回复的时候需要经常稍微换一下说法，尽量不要复述客户的话。

模板一：客户反映发货慢的情况： 
お客様 平素より弊社をご利用いただき、誠にありがとうございます。 
この度、税関より通知があり、年末に伴う貨物量の急増により通関手続きが大幅に遅延しているとの連絡を受けました。 
そのため、当初12月到着を予定しておりました商品が、1月中旬頃の到着となる見込みでございます。 
このような事態により、お客様に多大なご迷惑とご不便をおかけしておりますこと、心より深くお詫び申し上げます。 
商品が入荷次第、速やかに発送手配をいたしますので、何卒ご容赦いただきますようお願い申し上げます。 
また、今回商品遅延のご迷惑へのお詫びとして、ご予約商品を注文のお客様に無料キャンセル対応を行っております。 
お問い合わせでキャンセルのご連絡をいただければ無料キャンセル対応可能でございます 商品遅延でお客様に大変お待ちしてしまいまして申し訳ございません。
重ね重ね、深くお詫び申し上げますとともに、何卒ご理解賜りますようお願い申し上げます。 

模板二：客户给好评的情况： 
この度弊店をご利用いただきましてありがとうございます お忙しいところレビューを投稿して頂き誠にありがとうございます。 
お客様から高評価をいただきまして誠に有難うございます お客様がご利用上の嬉しさを拝見させていただき弊社スタッフたちも共感しております。 
当店で商品を購入しお客様の生活の中でお役に立てますと幸いです。 
また弊店のご利用をお待ちしております。 

模板三：この度は当店をご利用いただき、誠にありがとうございます。
商品が無事にお手元に届き、日々ご使用いただけているとのこと、大変嬉しく思います。 一方で、送り状の貼り方についてご不快な思いをさせてしまい、申し訳ございません。
配送時の見た目も含めて、最後までご満足いただけるよう配慮が不足しておりました。
年始の繁忙期であったとはいえ、このような点にも注意を払うべきでございました。 
今後は、梱包や発送の際に細部まで注意を払い、お客様により良いサービスを提供できるよう努めてまいります。
この度の貴重なご意見をありがとうございました。またのご利用を心よりお待ちしております。`
  }  
];

function CopyTextPopup(event) {
  event.preventDefault();
  const title = event.target.getAttribute("data-popup-title") || "Get in touch";

  const popup = document.createElement("div");
  popup.className = "email-popup";
  popup.setAttribute("role", "dialog");

  const content = document.createElement("div");
  content.className = "email-popup-content";

  // 只显示标题列表
  content.innerHTML = `
    <img src="./RabbitPOINT_files/GH0zZFiaQAAfYrl.png" class="email-popup-avatar">
    <h3>${title}</h3>
  `;

  copyMessages.forEach((item) => {
    const line = document.createElement("p");
    line.textContent = item.title;
    line.style.cursor = "pointer";

    line.onclick = async () => {
      try {
        await navigator.clipboard.writeText(item.content);
        line.textContent = "Copied!";
        setTimeout(() => {
          line.textContent = item.title;
        }, 2000);
      } catch (error) {
        line.textContent = "Failed";
        setTimeout(() => {
          line.textContent = item.title;
        }, 2000);
      }
    };

    content.appendChild(line);
  });

  popup.appendChild(content);

  const popupWrapper = document.getElementById("popup-wrapper");
  if (!popupWrapper) return;

  popupWrapper.appendChild(popup);
  document.body.classList.add("popup-active");

  const closePopup = (e) => {
    if (e.target !== popup) return;

    popup.classList.add("closing");
    document.body.classList.remove("popup-active");

    const content = popup.querySelector(".email-popup-content");
    content.addEventListener(
      "animationend",
      () => {
        document.removeEventListener("keydown", handleEscape);
        popup.removeEventListener("click", closePopup);
        popup.remove();
      },
      { once: true }
    );
  };

  const handleEscape = (e) => {
    if (e.key === "Escape") closePopup({ target: popup });
  };

  popup.addEventListener("click", closePopup);
  document.addEventListener("keydown", handleEscape);
}

/*Right*/
document.addEventListener("DOMContentLoaded", function(){

const link = document.getElementById("rakutenLink");
const originalText = link.textContent;

link.addEventListener("contextmenu", function(e){

    e.preventDefault();

    navigator.clipboard.writeText("SpGDtibfxj").catch(()=>{
        const input=document.createElement("input");
        input.value="SpGDtibfxj";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
    });

    link.textContent="Copied!";

    setTimeout(()=>{
        link.textContent=originalText;
    },1000);

});

});

document.addEventListener("DOMContentLoaded", function(){

const link = document.getElementById("YamatoLink");
const originalText = link.textContent;

link.addEventListener("contextmenu", function(e){

    e.preventDefault();

    navigator.clipboard.writeText("033868202201").catch(()=>{
        const input=document.createElement("input");
        input.value="033868202201";
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
    });

    link.textContent="Copied!";

    setTimeout(()=>{
        link.textContent=originalText;
    },1000);

});

});