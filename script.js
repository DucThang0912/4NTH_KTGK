document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js scene
    initThreeJS();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add hover effect to member cards with GSAP
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -15,
                rotationX: 5,
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1), 0 0 30px rgba(0, 195, 255, 0.3)',
                duration: 0.5,
                ease: 'power2.out'
            });
            
            // Animate image
            const img = this.querySelector('.member-image img');
            gsap.to(img, {
                scale: 1.1,
                filter: 'grayscale(0%)',
                duration: 0.8,
                ease: 'power2.out'
            });
            
            // Animate heading underline
            const heading = this.querySelector('h2::after');
            if (heading) {
                gsap.to(heading, {
                    width: '80%',
                    duration: 0.3,
                    ease: 'power1.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                rotationX: 0,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.05), 0 0 20px rgba(0, 195, 255, 0.2)',
                duration: 0.5,
                ease: 'power2.out'
            });
            
            // Reset image
            const img = this.querySelector('.member-image img');
            gsap.to(img, {
                scale: 1,
                filter: 'grayscale(30%)',
                duration: 0.8,
                ease: 'power2.out'
            });
            
            // Reset heading underline
            const heading = this.querySelector('h2::after');
            if (heading) {
                gsap.to(heading, {
                    width: 0,
                    duration: 0.3,
                    ease: 'power1.out'
                });
            }
        });
    });
    
    // Add parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const header = document.querySelector('header');
        
        // Parallax for header
        header.style.transform = `translateY(${scrollY * 0.3}px)`;
        
        // Fade in cards on scroll
        memberCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const cardHeight = card.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight - cardHeight / 4) {
                setTimeout(() => {
                    card.style.opacity = 1;
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    });
});

// Three.js implementation
function initThreeJS() {
    const container = document.getElementById('canvas-container');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    // Fill arrays with random values
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 10;
        posArray[i + 1] = (Math.random() - 0.5) * 10;
        posArray[i + 2] = (Math.random() - 0.5) * 10;
        
        // Scale
        scaleArray[i / 3] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x00c3ff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    // Create points
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x00c3ff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Position camera
    camera.position.z = 3;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particle system
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        // Mouse movement effect
        particlesMesh.rotation.x += mouseY * 0.0005;
        particlesMesh.rotation.y += mouseX * 0.0005;
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    animate();
}