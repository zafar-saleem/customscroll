(function () {
    // variables and references to DOM elements
    var $view = document.querySelector('#view'),
        $indicator = document.querySelector('#indicator'),
        offset = 0, min = 0, isMouseWheel = true, count = 1, direction,
        max = parseInt(getComputedStyle($view).height, 10) - innerHeight,
        relative = (innerHeight - 30) / max;

    // mouse scroll event, call onMouseScroll function
    $view.addEventListener('mousewheel', onMouseScroll);

    /*
     * sets detail and call scroll function
     */
    function onMouseScroll (e) { 
      var detail = e.detail, 
          wheelDelta = e.wheelDelta;
      
      // direction = e.deltaY;
      isMouseWheel = true;
      
      if (detail) {
        if (wheelDelta && (f = wheelDelta/detail)) {
          detail = detail/f;
        } else {
          detail = -detail/1.35;
        }
      } else {
        detail = wheelDelta/20;
      }
      
      e.delta = Math.min(Math.max(detail / 2, -1), 1);
      scroll(offset + detail, e.delta);
      
      e.preventDefault();
      e.stopPropagation(); 
      return false;
    }

    /*
     * Main function that scrolls the view and indicator
     */
    function scroll (mouseYPos, delta) { 
      resetOffset(mouseYPos);

      function frame () {
        isMouseWheel = false;
        
        $view.style.top = -(offset) + 'px';
        $indicator.style.top = offset * relative + 'px';
        cancelAnimationFrame(intervalId);
      }
      var speed = (delta >= 1 || delta <= -1) ? 1/1000 : 1000/60;
      
      if (isMouseWheel) { 
        var intervalId =  requestAnimationFrame(frame);
      }
    }

    /*
     * Resets offset
     */
    function resetOffset (mouseYPos) {
      if (mouseYPos > max) {
        offset = max;
      } else {
        if (mouseYPos < min) {
          offset = min;
        } else {
          offset = mouseYPos; 
        }
      }
    }
})();