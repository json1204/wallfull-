/*所有jq对象都能访问这个函数*/
/*option:
* col:列数
* pad:间距*/
/*$.fn = $.prototype :将成员添加到构造函数的原型中*/
// 封装到jq原型上的
$.fn.waterFull = function (option) {
  // 设置默认的参数
  var defaultOption = {
    col: 5,
    pad: 20
  }
  // 判断是否传入参数；如果传入就使用；没有就就使用默认的
  $.extend(defaultOption, option)
  var col = defaultOption.col
  var pad = defaultOption.pad
  // 计算出每个图片的宽度（屏幕总宽度-（总的padding））/colde列数
  var itemWidth = (totalWidth - (col + 1) * pad) / col
  // 获取全部图片元素
  var allItem = this.children()
  // 创建一个空数组用来贮存高度
  var heightArr = []
  // 只给宽度；在计算高度时需要一定的时间、所以要到定时器延时setTimeOut
  setTimeout(function () {
    allItem.each(function (index, value, arr) {
      var item = $(value)
      var itemHeight = item.height()
      if (index < col) { // 先处理第一排的 全部的排完
        heightArr[index] = itemHeight
        // 给当前的元素定位
        item.css({
          left: pad + (itemWidth + pad) * index,
        top0})
      }else {
        // 第二行及以后的
        var mincol = 0; // 假设最小的是第一
        var minHeight = heightArr[mincol]
        for (var i = 0;i < heightArr.length;i++) {
          if (heightArr[i] < minHeight) {
            minHeight = heightArr[i]
            mincol = i
          }
        }
        // 改变第二及以后的定位位置
        item.css({
          left: pad + (itemWidth + pad) * index,
          top: minHeight + pad
        })
        // 让第六个图片覆盖点最少的高度数组；高度数组还是五个；把最小的替换为第六个；然后在循环笔记
        heightArr[mincol] += pad + itemHeight
      }
    })
    // 在执行完后要计算出最高的高度
    var maxCol = 0
    var maxHeigh = heightArr[maxCol]
    for (var i = 0;i < heighArr.length;i++) {
      if (heighArr[i] > maxHeigh[i]) {
        maxCol = i
        maxHeigh = heighArr[i]
      }
    }
    // 定位要设置高度不然后面的；布局看不到 注意函数的this
    $('.items').heigh(maxHeigh)
  }, 500)
}
