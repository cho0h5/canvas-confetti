let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

let paper_width = canvas.width / 200;
let paper_height = canvas.height / 200;

// 종이 조각 하나 그리기
function drawPaper(x, y, width, height, rotate, color) {
  // 회전
  offset_x = x + width / 2;
  offset_y = y + height / 2;
  ctx.translate(offset_x, offset_y);
  ctx.rotate(-(rotate / 180) * Math.PI);
  ctx.translate(-offset_x, -offset_y);

  // 색 설정
  ctx.fillStyle = color;

  // 사각형 그리기
  ctx.fillRect(x, y, width, height);

  // 회전 원래대로
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

drawPaper(200, 200, 20, 5, 10, "black");
drawPaper(300, 20, 20, 5, 70, "blue");
