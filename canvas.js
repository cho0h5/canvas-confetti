//////////////////////////////
// 수정 가능
const paper_density = 0.05;
const up_velocity = 1.5;
const rotate_velocity = 1.4;
const paper_size = 0.8;
const paper_ratio = 3;
//////////////////////////////

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

let paper_height = (canvas.height / 20) * paper_size;
let paper_width = (paper_height / paper_ratio);

let paper_max =
  ((paper_density * (canvas.width * canvas.height)) /
    (paper_height * paper_width)) *
  1;

papers = [];

// 종이 조각 하나 그리기
function drawPaper(x, y, width, height, angle, color) {
  // 회전
  offset_x = x + width / 2;
  offset_y = y + height / 2;
  ctx.translate(offset_x, offset_y);
  ctx.rotate(-(angle / 180) * Math.PI);
  ctx.translate(-offset_x, -offset_y);

  // 색 설정
  ctx.fillStyle = color;

  // 사각형 그리기
  ctx.fillRect(x, y, width, height);

  // 회전 원래대로
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function random_color() {
  return (
    "#" +
    Math.round((Math.random() / 2 + 0.5) * 0xff).toString(16) +
    Math.round((Math.random() / 2 + 0.5) * 0xff).toString(16) +
    Math.round((Math.random() / 2 + 0.5) * 0xff).toString(16)
  );
}

function random_x() {
  return Math.random() * canvas.width;
}

function random_y() {
  return Math.random() * canvas.height;
}

function random_angle() {
  return Math.random() * 180;
}

function clear_background() {
  ctx.fillStyle = "rgb(19,106,186)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function generate_paper(isStart) {
  y = 0;
  if (isStart) {
    y = random_y() + 100;
  } else {
    y = random_y() / 10 + canvas.height;
  }
  papers.push({
    x: random_x(),
    y: y,
    width: paper_width,
    height: paper_height,
    angle: random_angle(),
    color: random_color(),
    velocity_y: (Math.random() + 0.5) * 2 * up_velocity,
    velocity_angle: (Math.random() + 0.5) * 2 * rotate_velocity,
  });
}

function draw() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  paper_max =
    ((paper_density * (canvas.width * canvas.height)) /
      (paper_height * paper_width)) *
    1;

  clear_background();

  for (let i = 0; i < papers.length; i++) {
    papers[i]["y"] -= papers[i]["velocity_y"];
    papers[i]["angle"] += papers[i]["velocity_angle"];

    drawPaper(
      papers[i]["x"],
      papers[i]["y"],
      papers[i]["width"],
      papers[i]["height"],
      papers[i]["angle"],
      papers[i]["color"]
    );
  }

  for (let i = 0; i < papers.length; i++)
    if (papers[i]["y"] < -50) papers.splice(i, 1);

  if (papers.length <= paper_max) generate_paper();

  setTimeout(draw, 16);
}

function init() {
  for (i = 0; i < paper_max; i++) generate_paper(true);
  draw();
}

init();
