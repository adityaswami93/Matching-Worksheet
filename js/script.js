    /* script.js, by default saved in subfolder /js */
    // now write something here, you can use jQuery or vanilla JS
    // we load the script only at the bottom of the HTML page so that we know the DOM has been loaded
    var count = 0;
    var match = [];
    var mousePressed = false;
    var drawover = true;
    var leftcol = -2;
    var leftrow = -1;
    var rightcol = -2;
    var rightrow = -1;
    var leftpicname = "";
    var rightpicname = "";
    $( document ).ready(function() {
      $('#instruction').show();
      $('#errorDiv').show();
      $('#errorMsg').show();
      createTable();

      var clickCounter = 0;

      var totalMatch = parseInt($('#n').val());
      match = Array(totalMatch).fill(-1);
      var totalLimit = 5 * totalMatch;
      var allMatch = false;
      $(document).on('click','#btn',function(){
        $('#totalLimit').text(totalLimit);
        $("#gen").hide();
        $('#errorMsg').empty();
        $('#errorMsg').append('<br>');
        $("#msgHome").hide();
        $('#instruction').show();
        $('#resetbtn').show();
        $('#tbl').empty();
        leftcol = -2;
        leftrow = -1;
        rightcol = -2;
        rightrow = -1;
        leftpicname = "";
        rightpicname = "";

        clickCounter = 0;

        count = 0;
        totalMatch = parseInt($('#n').val());
        totalLimit = 5 * totalMatch;
        match = Array(totalMatch).fill(-1);
        createTable();

        $('#lastimage').on("load", function() {
          loadCanvas();
          InitThis();
        });
          //canvas.setAttribute('height',centreColHeight+"px");
          //canvas.setAttribute('width',centreColWidth+"px");
      });

      $(document).on('click','#clearbtn',function(){
        clearArea();
        return false;
      });



      /*
      $('#resetbtn').click(function(){
      $('#gen').show();
      $("#msgHome").show();
      $('#instruction').hide();
      $('#tbl').empty();
      $('#errorMsg').empty();
      $('#tbl').hide();
      $('#resetbtn').hide();

    });
    */

    $('#lastimage').on("load", function() {
      loadCanvas();
      InitThis();
    });

    $(document).on('mousedown','.left',function(){
      mousePressed = true;
      drawover = false;
      clickCounter++;
      $('#counterDisplay').text(clickCounter);
      $(this).toggleClass('active-left');
      leftpicname = $(this).find('.leftpic').attr('src');
      var newleftcol = $(this).parent().children().index($(this));
      var newleftrow = $(this).parent().parent().children().index($(this).parent());
      if ((newleftcol==leftcol)&&(newleftrow!=leftrow)) {
        $("#errorMsg").text('Both cells selected from the left column.');
        $('.left').removeClass('active-left');
        leftcol = -1;
        newleftcol = -2;
        leftpicname = "";
        countExceeded(clickCounter,totalLimit);
        return false;
      }
      else {
        leftcol = newleftcol;
        leftrow = newleftrow;
      }

      if (compareString(leftpicname,rightpicname)){
        match[leftrow]=rightrow;
        matchImg(leftpicname,rightpicname);
        countExceeded(clickCounter,totalLimit);

        leftcol = -2;
        rightcol = -2;
        leftpicname = "";
        rightpicname = "";
      }
      else if((leftpicname != "")&&(rightpicname != "")){
        $("#errorMsg").text('The pictures do not match. Try again!');
        clearArea();
        drawLines(match);
        $('.right').find('img[src$="'+rightpicname+'"]').closest('td').removeClass('active-right');
        $(this).find('img[src$="'+leftpicname+'"]').closest('td').removeClass('active-left');
        countExceeded(clickCounter,totalLimit);
        leftcol = -2;
        rightcol = -2;
        leftpicname = "";
        rightpicname = "";

      }
      countExceeded(clickCounter,totalLimit);


      /*
      else{
      $("#errorMsg").text('Incorrect. Try Again');
    }
    */

    $('.leftpic-darken').click(function(e){
      return false;
    });

    $('.rightpic-darken').click(function(e){
      return false;
    });

    });

  $(document).on('mousedown','.right',function(){
    mousePressed = true;
    drawover = false;
    clickCounter++;
    $('#counterDisplay').text(clickCounter);
    $(this).toggleClass('active-right');
    rightpicname = $(this).find('.rightpic').attr('src');
    var newrightcol = $(this).parent().children().index($(this));
    var newrightrow = $(this).parent().parent().children().index($(this).parent());
    if ((newrightcol==rightcol)&&(newrightrow!=rightrow)) {
      $("#errorMsg").text('Both cells selected from the right column.');
      $('.right').removeClass('active-right');
      rightcol = -1;
      newrightcol = -2;
      rightpicname = "";
      countExceeded(clickCounter,totalLimit);
      return false;
    }
    else {
      rightcol = newrightcol;
      rightrow = newrightrow;
    }
    if ((compareString(leftpicname,rightpicname))&&(rightpicname!="")){
      match[leftrow] = rightrow;
      matchImg(leftpicname,rightpicname);
      countExceeded(clickCounter,totalLimit);
      leftcol = -2;
      rightcol = -2;
      leftpicname = "";
      rightpicname = "";
    }
    else if((leftpicname != "")&&(rightpicname != "")){
      $("#errorMsg").text('The pictures do not match. Try again!');
      clearArea();
      drawLines(match);
      $(this).find('img[src$="'+rightpicname+'"]').closest('td').removeClass('active-right');
      $('.left').find('img[src$="'+leftpicname+'"]').closest('td').removeClass('active-left');
      countExceeded(clickCounter,totalLimit);
      leftcol = -2;
      rightcol = -2;
      leftpicname = "";
      rightpicname = "";

    }

    /*
    else if({
    $("#errorMsg").text('Incorrect. Try Again');
  }
  */
  countExceeded(clickCounter,totalLimit);

  $('.leftpic-darken').click(function(e){
    return false;
  });

  $('.rightpic-darken').click(function(e){
    return false;
  });






  });





  });





  function countExceeded(count,totalLimit){
      if (count==totalLimit){
          $("#errorMsg").text('The number of click has exceeded 20. The game will restart!');
          $("#gen").show();
          $('#resetbtn').hide();
          $('.left').off('click');
          $('.right').off('click');

          return true;
      }
      return false;
  }


  function compareString(str1,str2){
      if(str1===str2)
          return true;
      else
          return false;
  }

  var leftglbarr,rightglbarr;

  function createTable() {
      var num = $('#n').val();
      var rand=[];
      for (var i = 1;i<13;i++)
          rand[i-1]=i;
      rand = shuffle(rand);
      var leftarr = rand.slice(0,num);
      var rightarr = rand.slice(0,num);
      leftarr = shuffle(leftarr);
      rightarr = shuffle(rightarr);
      var permutation = false;
      var k = 0;
      while (permutation == false){
          if(leftarr[k]==rightarr[k]){
              k = 0;
              leftarr = shuffle(leftarr);
              rightarr = shuffle(rightarr);
              permutation = false;
              continue;
          }
          if (k==num-1)
              permutation = true;
          k++;
      }
      $('#tbl').show();
      for (var j = 0; j < num; j++) {
          if (j==0){
              $('#tbl').append("<tr><td class='left'><img class='leftpic img-responsive' src='images/" + leftarr[j] + ".png' alt='hello'/></td><td id='centrecol' rowspan = " + num + "><canvas id='cvs'></canvas></td><td class = 'right'><img class='rightpic img-responsive' src='images/" + rightarr[j] + ".png' alt='hello'/></td></tr>");
          }
          else if (j==(num-1)) {
            $('#tbl').append("<tr><td class='left'><img class='leftpic img-responsive' src='images/" + leftarr[j] + ".png' alt='hello'/></td><td class = 'right'><img class='rightpic img-responsive' id='lastimage' src='images/" + rightarr[j] + ".png' alt='hello'/></td></tr>");
          }
          else {
            $('#tbl').append("<tr><td class='left'><img class='leftpic img-responsive' src='images/" + leftarr[j] + ".png' alt='hello'/></td><td class = 'right'><img class='rightpic img-responsive' src='images/" + rightarr[j] + ".png' alt='hello'/></td></tr>");
          }
      }
      leftglbarr = leftarr;
      rightglbarr = rightarr;
  }



  /*
  $(window).on("load", function() {

    var canvas = $('#cvs')[0];
    alert($('#centrecol').width()+' '+$('#centrecol').height());
    canvas.width = parseInt($('#centrecol').width())-10;
    canvas.height = $('#centrecol').height();
    alert($('#centrecol').width()+' '+$('#centrecol').height());
    alert(canvas.width+' '+canvas.height);

    //canvas.setAttribute('height',centreColHeight+"px");
    //canvas.setAttribute('width',centreColWidth+"px");
  });
  */
  function loadCanvas(){
    //alert('lastimage');
    var canvas = $('#cvs')[0];
    canvas.width = parseInt($('#centrecol').width());
    canvas.height = $('#centrecol').height();
    /*
    if ($(window).width() > 991) {
     canvas.width = 1.1 * canvas.width;
   }
   */
    //alert(canvas.width+' '+canvas.height);
    //canvas.width = 1.1 * canvas.width;
    //alert(canvas.width+' '+canvas.height);
  }


  function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  function drawStraightLine(l, r) {
    var canvas = $('#cvs')[0];
    //canvas.text('january');
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var num = parseInt($('#n').val());
    var doubleDivide= height/(num*2);
    var singleDivide = height/num;
    var startPt = doubleDivide + ((l) * singleDivide);
    var endPt = doubleDivide + ((r) * singleDivide);
    context.beginPath();
    context.moveTo(0, startPt);
    context.lineTo(width, endPt);
    context.strokeStyle = $('#selColor').val();
    context.lineWidth = $('#selWidth').val();
    context.lineJoin = "round";
    context.stroke();
  }

  function drawCurvyLine(l, r) {
    var canvas = $('#cvs')[0];
    //canvas.text('january');
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var num = parseInt($('#n').val());
    var doubleDivide= height/(num*2);
    var singleDivide = height/num;
    var startPt = doubleDivide + ((l) * singleDivide);
    var endPt = doubleDivide + ((r) * singleDivide);
    /*
    context.beginPath();
    context.moveTo(0, startPt);
    context.lineTo(width, endPt);
    context.lineWidth = 0;
    context.lineCap = 'square';
    context.stroke();
    */
    context.beginPath();
    context.moveTo(0, startPt);
    if(l<r){
      context.bezierCurveTo(100, startPt-5, width-100, endPt+5, width, endPt);
    } else {
      context.bezierCurveTo(100, startPt+5, width-100, endPt-5, width, endPt);
    }
    context.strokeStyle = $('#selColor').val();
    context.lineWidth = $('#selWidth').val();
    context.lineJoin = "round";
    context.stroke();
  }




  var lastX, lastY;
  var ctx;
  var piccliked = false;

  function InitThis() {
      var canvas = $('#cvs')[0];
    //canvas.text('january');
      ctx = canvas.getContext('2d');
      var width = canvas.width;
      var height = canvas.height;
      var num = parseInt($('#n').val());
      //canvas.text('january');
      var lowRangeWidth = 0.95 * width;
      var highRangeWidth = 1.05 * height;
      var lowStartWidth = 0.05 * width;
      var singleDivide = height/num;
      var startX,startY;
      var startImg;
      
      /*
      $('#cvs').mousedown(function (e) {
          piccliked = true;
          Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
      });
    */

      
      $('#cvs').mousemove(function (e) {
          if(drawover==false){
              //alert('start');
            startX = e.pageX - $(this).offset().left;
                  //alert(startX);
            startY = e.pageY - $(this).offset().top;
            startImg = parseInt(startY/singleDivide);
                  //mousePressed = false;
            if((lowStartWidth<startX)&&(startX<lowRangeWidth)){
              $("#errorMsg").text('Try again from nearer the picture');
                clearArea();
                drawLines(match);
                mousePressed = false;
            }
            drawover = true;
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
          }
          if (mousePressed) {
              Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
              //alert(lowStartWidth+' '+startX);
          }
      });

      $('#cvs').mouseup(function (e) {
          

          //alert('true');
          //alert(startX);
          if(mousePressed){
            if(startX<lowStartWidth){
             if(lowRangeWidth<lastX){
               var imgSelected = parseInt(lastY/singleDivide);
               if(leftglbarr[startImg]==rightglbarr[imgSelected]){
                 match[startImg] = imgSelected;
                 matchImg(leftglbarr[startImg]+'.png',rightglbarr[imgSelected]+'.png');
                 leftcol = -2;
                rightcol = -2;
                leftpicname = "";
                rightpicname = "";
               }
               else {
                 $("#errorMsg").text('The pictures do not match. Try again!');
                 clearArea();
                  drawLines(match);
               }

             }
             else {
                $("#errorMsg").text('The columns are different and or line not completed');
                clearArea();
                drawLines(match);
              }
           }
           else if (startX>lowRangeWidth) {
             if(lastX<lowStartWidth){
               var imgSelected = parseInt(lastY/singleDivide);
               if(leftglbarr[imgSelected]==rightglbarr[startImg]){
                 match[imgSelected] = startImg;
                 matchImg(leftglbarr[imgSelected]+'.png',rightglbarr[startImg]+'.png');
                 leftcol = -2;
                rightcol = -2;
                leftpicname = "";
                rightpicname = "";
               }
               else {
                 $("#errorMsg").text('The pictures do not match. Try again!');
                  clearArea();
                  drawLines(match);
               }
             }
             else {
                $("#errorMsg").text('The columns are different and or line not completed');
                clearArea();
                drawLines(match);
              }
           }
         }
         mousePressed = false;
         

      });
        $('#cvs').mouseleave(function (e) {
          //piccliked = false;
          
          if(mousePressed){
            if(startX<lowStartWidth){
             if(lowRangeWidth<lastX){
               var imgSelected = parseInt(lastY/singleDivide);
               if(leftglbarr[startImg]==rightglbarr[imgSelected]){
                 match[startImg] = imgSelected;
                 matchImg(leftglbarr[startImg]+'.png',rightglbarr[imgSelected]+'.png');
                 leftcol = -2;
                rightcol = -2;
                leftpicname = "";
                rightpicname = "";
               }
               else {
                 $("#errorMsg").text('The pictures do not match. Try again!');
                 clearArea();
                  drawLines(match);
               }

             }
             else {
                $("#errorMsg").text('The columns are different and or line not completed');
                clearArea();
                drawLines(match);
              }
           }
           else if (startX>lowRangeWidth) {
             if(lastX<lowStartWidth){
               var imgSelected = parseInt(lastY/singleDivide);
               if(leftglbarr[imgSelected]==rightglbarr[startImg]){
                 match[imgSelected] = startImg;
                 matchImg(leftglbarr[imgSelected]+'.png',rightglbarr[startImg]+'.png');
                 leftcol = -2;
                rightcol = -2;
                leftpicname = "";
                rightpicname = "";
               }
               else {
                 $("#errorMsg").text('The pictures do not match. Try again!');
                  clearArea();
                  drawLines(match);
               }
             }
             else {
                $("#errorMsg").text('The columns are different and or line not completed');
                clearArea();
                drawLines(match);
              }
           }
         }
         mousePressed = false;
         

      });

    // mobile devices

     $('#cvs').on('touchmove',function (e) {
          if(drawover==false){
              //alert('start');
            startX = e.pageX - $(this).offset().left;
                  //alert(startX);
            startY = e.pageY - $(this).offset().top;
            startImg = parseInt(startY/singleDivide);
                  //mousePressed = false;
            if((lowStartWidth<startX)&&(startX<lowRangeWidth)){
              $("#errorMsg").text('Try again from nearer the picture');
            }
            drawover = true;
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
          }
          if (mousePressed) {
            alert('yes');
              Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
              //alert(lowStartWidth+' '+startX);
          }
      });

      $('#cvs').on('touchend',function (e) {
          mousePressed = false;

          //alert('true');
          //alert(startX);
          
          if(startX<lowStartWidth){
           if(lowRangeWidth<lastX){
             var imgSelected = parseInt(lastY/singleDivide);
             if(leftglbarr[startImg]==rightglbarr[imgSelected]){
               match[startImg] = imgSelected;
               matchImg(leftglbarr[startImg],rightglbarr[imgSelected]);
             }
             else {
               $("#errorMsg").text('The pictures do not match. Try again!');
               clearArea();
                drawLines(match);
             }

           }
         }
         else if (startX>lowRangeWidth) {
           if(lastX<lowStartWidth){
             var imgSelected = parseInt(lastY/singleDivide);
             if(leftglbarr[imgSelected]==rightglbarr[startImg]){
               match[imgSelected] = startImg;
               matchImg(leftglbarr[imgSelected],rightglbarr[startImg]);
             }
             else {
               $("#errorMsg").text('The pictures do not match. Try again!');
               clearArea();
                drawLines(match);
             }
           }
         }
         

      });
    /*
        $('#cvs').mouseleave(function (e) {
          //piccliked = false;
          
          if(mousePressed){
            if(startX<lowStartWidth){
             if(lowRangeWidth<lastX){
               var imgSelected = parseInt(lastY/singleDivide);
               if(leftglbarr[startImg]==rightglbarr[imgSelected]){
                 match[startImg] = imgSelected;
                 matchImg(leftglbarr[startImg]+'.png',rightglbarr[imgSelected]+'.png');
               }
               else {
                 $("#errorMsg").text('The pictures do not match. Try again!');
                 clearArea();
                  drawLines(match);
               }

             }
           }
           else if (startX>lowRangeWidth) {
             if(lastX<lowStartWidth){
               var imgSelected = parseInt(lastY/singleDivide);
               if(leftglbarr[imgSelected]==rightglbarr[startImg]){
                 match[imgSelected] = startImg;
                 matchImg(leftglbarr[imgSelected]+'.png',rightglbarr[startImg]+'.png');
               }
               else {
                 $("#errorMsg").text('The pictures do not match. Try again!');
                  clearArea();
                  drawLines(match);
               }
             }
           }
           mousePressed = false;
         }

         

      });
    */


  }

  function matchImg(leftImg,rightImg){
    var totalMatch = parseInt($('#n').val());
    $('.right').find('img[src$="'+rightImg+'"]').addClass('rightpic-darken');
    $('.right').find('img[src$="'+rightImg+'"]').closest('td').removeClass('active-right');
    $('.right').find('img[src$="'+rightImg+'"]').closest('td').addClass('right-next');
    $('.left').find('img[src$="'+leftImg+'"]').addClass('leftpic-darken');
    $('.left').find('img[src$="'+leftImg+'"]').closest('td').removeClass('active-left');
    $('.left').find('img[src$="'+leftImg+'"]').closest('td').addClass('left-next');
    clearArea();
    drawLines(match);
    $("#errorMsg").text('Congratulations: It is a match');
    count++;
    if(count==totalMatch){
      $("#errorMsg").text('Congratulations: All Animals were correctly matched. Restart?');
      $("#gen").show();
      $('#resetbtn').hide();
      $('#cvs').css('pointer-events','none');
      return false;
    }
  }

  function Draw(x, y, isDown) {
      if (isDown) {
          ctx.beginPath();
          ctx.strokeStyle = $('#selColor').val();
          ctx.lineWidth = $('#selWidth').val();
          ctx.lineJoin = "round";
          ctx.moveTo(lastX, lastY);
          ctx.lineTo(x, y);
          ctx.closePath();
          ctx.stroke();
      }
      lastX = x; lastY = y;
  }

  function clearArea() {
      // Use the identity matrix while clearing the canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  function drawLines(match){
    for (var i = 0; i < match.length; i++) {
      if (match[i]!=-1){
        //alert(match);
        if (Math.abs(i - match[i]) <= 1){
          //alert('yes');
          drawStraightLine(i,match[i]);
        }
        else {
          drawCurvyLine(i,match[i]);
        }
      }
    }
  }
