// وظيفة المتصفح والبحث الذكي
window.goBrowse = () => {
    const query = document.getElementById('browser-input').value;
    if (!query) return;
    if (query.includes('.') && !query.includes(' ')) {
        window.open(query.startsWith('http') ? query : 'https://' + query, '_blank');
    } else {
        window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
    }
};

// إخفاء خيارات الجودة عند اختيار MP3
window.toggleQualityOptions = () => {
    const format = document.getElementById('format-type').value;
    const qualitySelector = document.getElementById('quality-selector');
    qualitySelector.style.opacity = format === 'mp3' ? '0.3' : '1';
    qualitySelector.disabled = format === 'mp3';
};

// وظيفة التحميل والمعاينة الأساسية
window.handleDownload = async () => {
    const url = document.getElementById('video-url').value;
    const format = document.getElementById('format-type').value;
    const quality = document.getElementById('quality-selector').value;
    const btn = document.getElementById('action-btn');
    const loader = document.getElementById('loader');
    const resultArea = document.getElementById('result-area');

    if (!url) { alert("من فضلك ضع رابط الفيديو أولاً"); return; }

    btn.disabled = true;
    btn.innerText = "جاري الاستخراج...";
    loader.style.display = "block";
    resultArea.style.display = "none";

    try {
        const response = await fetch("https://api.cobalt.tools/api/json", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({
                url: url,
                downloadMode: format,
                videoQuality: quality, // جودة الفيديو المحددة (144p إلى 4k)
                audioFormat: "best",   // أفضل جودة صوت
                filenamePattern: "pretty"
            })
        });

        const data = await response.json();

        if (data.url) {
            // إنشاء واجهة المعاينة
            let mediaPreview = format === 'mp4' 
                ? `<video class="preview-media" controls><source src="${data.url}" type="video/mp4"></video>`
                : `<audio class="preview-media" controls><source src="${data.url}" type="audio/mpeg"></audio>`;

            resultArea.innerHTML = `
                <p style="color:#ffcc00; font-weight:bold;">✅ الرابط جاهز بجودة: ${quality === 'max' ? 'أقصى جودة' : quality + 'p'}</p>
                ${mediaPreview}
                <a href="${data.url}" class="dl-link-final" target="_blank" download>بدء التحميل المباشر</a>
            `;
            
            resultArea.style.display = "block";
            loader.style.display = "none";
        } else {
            alert("عذراً، تعذر جلب الجودة المطلوبة لهذا الرابط.");
            loader.style.display = "none";
        }
    } catch (e) {
        alert("خطأ في الخادم، يرجى المحاولة لاحقاً");
        loader.style.display = "none";
    } finally {
        btn.disabled = false;
        btn.innerText = "استخراج ومعاينة";
    }
};
