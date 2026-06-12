/* Saumya Aanchal — shared interactions */
(function(){
  window.__rev = true;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* mobile nav */
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
      });
    });
  }

  /* publications tabs */
  var tabs = document.querySelectorAll('.tab');
  if(tabs.length){
    tabs.forEach(function(tab){
      tab.addEventListener('click', function(){
        var target = tab.getAttribute('data-tab');
        tabs.forEach(function(t){ t.classList.remove('active'); });
        document.querySelectorAll('.panel').forEach(function(p){ p.classList.remove('active'); });
        tab.classList.add('active');
        var panel = document.getElementById('panel-' + target);
        if(panel){
          panel.classList.add('active');
          panel.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
        }
      });
    });
  }

  /* scroll reveal */
  var reveals = document.querySelectorAll('.reveal');
  if(reduce){
    reveals.forEach(function(el){ el.classList.add('in'); });
  } else if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold:.12, rootMargin:'0px 0px -8% 0px' });
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }

  /* water-light parallax — slow, ambient, pointer-led */
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var tide = document.querySelector('.tide');
  if(tide && canHover && !reduce){
    var tx=0,ty=0,cx=0,cy=0;
    window.addEventListener('pointermove', function(e){
      tx = ((e.clientX/window.innerWidth)-0.5)*26;
      ty = ((e.clientY/window.innerHeight)-0.5)*26;
    }, {passive:true});
    (function loop(){
      cx += (tx-cx)*0.05; cy += (ty-cy)*0.05;
      tide.style.setProperty('--px', cx.toFixed(2)+'px');
      tide.style.setProperty('--py', cy.toFixed(2)+'px');
      requestAnimationFrame(loop);
    })();
  }

  /* Substack writing */
  var feed = document.getElementById('substack-posts');
  if(feed){
    var SUBSTACK = 'https://saumyaaanchal.substack.com';
    fetch('data/posts.json').then(function(r){
      if(!r.ok) throw new Error('load');
      return r.json();
    }).then(function(posts){
      if(!posts || !posts.length){ throw new Error('empty'); }
      feed.innerHTML = posts.map(function(post){
        var d = new Date(post.published);
        var date = isNaN(d) ? '' : d.toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
        var excerpt = (post.summary || '').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim().slice(0,220);
        return '<a class="post" href="'+post.link+'" target="_blank" rel="noopener">'
             + (date ? '<span class="date">'+date+'</span>' : '')
             + '<h3>'+post.title+'</h3>'
             + (excerpt ? '<p>'+excerpt+'…</p>' : '')
             + '</a>';
      }).join('');
    }).catch(function(){
      feed.innerHTML = '<p class="blog-empty">Read the latest writing on <a href="'+SUBSTACK+'" target="_blank" rel="noopener">Substack →</a></p>';
    });
  }
})();
