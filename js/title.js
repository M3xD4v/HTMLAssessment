document.addEventListener('DOMContentLoaded', function () {
  const title = document.querySelector('.title');
  const container = document.querySelector('.Dcontainer');

  const containerRect = container.getBoundingClientRect();
  const containerCenterX = containerRect.left + containerRect.width / 2;
  const containerCenterY = containerRect.top + containerRect.height / 2;

  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX - containerCenterX;
    const mouseY = e.clientY - containerCenterY;

    const rotateX = mouseY * -0.02;
    const rotateY = mouseX * 0.02;

    title.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  document.addEventListener('mouseleave', () => {
    title.style.transform = 'rotateX(0) rotateY(0)';
  });
});