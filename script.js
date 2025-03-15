// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
  // 初始化元素
  const cards = document.querySelectorAll('.card');
  const header = document.querySelector('header');
  
  // 头部动画
  header.style.opacity = '0';
  header.style.transform = 'translateY(-20px)';
  setTimeout(() => {
    header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    header.style.opacity = '1';
    header.style.transform = 'translateY(0)';
  }, 100);

  // 卡片点击事件
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const pluginName = card.querySelector('h3').textContent;
      window.location.href = `download.html?plugin=${encodeURIComponent(pluginName)}`;
    });
  });

  // 卡片交错动画
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px) scale(0.95)';
    setTimeout(() => {
      card.style.transition = `opacity 0.6s ${index * 0.1}s ease, transform 0.6s ${index * 0.1}s ease`;
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
    }, 300 + index * 50);
  });

  // 视差效果
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const offset = rect.top + scrollTop;
      const scrollPercent = (offset - window.innerHeight) / window.innerHeight;
      card.style.transform = `translateY(${scrollPercent * 20}px)`;
    });
  });

  // 增强光效
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const glow = card.querySelector('.glow') || document.createElement('div');
      
      if (!card.querySelector('.glow')) {
        glow.classList.add('glow');
        glow.style.position = 'absolute';
        glow.style.width = '100%';
        glow.style.height = '100%';
        glow.style.top = '0';
        glow.style.left = '0';
        glow.style.pointerEvents = 'none';
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.4), transparent 70%)`;
        card.appendChild(glow);
      }

      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.4), transparent 70%)`;
    });

    card.addEventListener('mouseleave', () => {
      const glow = card.querySelector('.glow');
      if (glow) {
        glow.style.opacity = '0';
        setTimeout(() => glow.remove(), 300);
      }
    });
  });

  // 下载页面插件名称处理
  const urlParams = new URLSearchParams(window.location.search);
  const pluginName = urlParams.get('plugin');
  if (pluginName) {
    const title = document.getElementById('plugin-title');
    if (title) {
      title.textContent = `${pluginName} 下载`;
    }
  }
});
