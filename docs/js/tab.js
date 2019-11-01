// 1.  切换功能
// 2.  添加功能
// 3.  删除功能
// 4.  修改功能

var _tabThis = null;

class Tab {
  constructor (ele) {
    // 转存 this
    _tabThis = this;
    // 获取元素
    this.ele = document.querySelector(ele);
    // 获取加号 DOM
    this.add = this.ele.querySelector('.tabadd');
    //  获取 ul
    this.ul = this.ele.querySelector('.fisrstnav-list');
    // 获取标签 wrapper
    this.sectionWrapper = this.ele.querySelector('.tabscon');
    // 初始化对象
    this.init();
  }

  // 初始化
  init () {
    this.updateNode();
    // 绑定增加标签事件
    this.add.onclick = this.addTab;
    // 给每个元素绑定事件
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      // 绑定选中高亮事件
      this.lis[i].onclick = this.toggleTab;
      // 绑定双击修改事件
      this.span[i].ondblclick = this.editTab;
      this.sections[i].ondblclick = this.editTab;
      // 绑定删除事件
      this.del[i].onclick = this.removeTab;
    }
  }
  updateNode() {
    // 获取删除按钮
    this.del = this.ele.querySelectorAll('.iconfont');
    // 获取标签列表
    this.lis = this.ele.querySelectorAll('li');
     // 获取标签页
    this.sections = this.ele.querySelectorAll('section');
    // 获取每个li里面的span内容
    this.span = this.ele.querySelectorAll('.fisrstnav-list li span:first-child')
  }
  // 切换功能
  toggleTab () {
    _tabThis.clearClass();
    // 给当前点击的元素添加 class
    this.className = 'liaction';
    _tabThis.sections[this.index].className = 'conactive';
  }
  // 清除高亮 class
  clearClass () {
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].className = '';
      this.sections[i].className = '';
    }
  }
  //添加功能
  addTab () {
    // 清楚所有高亮
    _tabThis.clearClass();
    var li = `<li class="liaction">
                <span>新选项卡</span>
                <i class="iconfont icon-shanchu"></i>
              </li>`;
    
    var section = `<section class="conactive">新增标签页</section>`;

    // 创建 li 元素和新的内容section
    _tabThis.ul.insertAdjacentHTML('beforeend', li);
    _tabThis.sectionWrapper.insertAdjacentHTML('beforeend',section);

    _tabThis.init();
  }
  // 删除功能
  removeTab (e) {
    // 阻止冒泡事件
    e.stopPropagation(); 
    // 获取索引号
    var index = this.parentNode.index;
    // console.log(index);
    // 删除 li
    _tabThis.lis[index].remove();
    // 删除标签页
    _tabThis.sections[index].remove();
    // 重新获取 li  和 section 的标签
    _tabThis.init();
    // 当已经有高亮的存在时，不执行接下来的操作
    if(document.querySelector('.liaction')) return;
    index--;
    // 逻辑'与',只要有一个是非，那就不执行
    _tabThis.lis[index] && _tabThis.lis[index].click();
    _tabThis.lis[index+1] && _tabThis.lis[index+1].click();
  }
  // 修改功能
  editTab () {
    var str = this.innerText;
    // 禁止双击选中文字
    window.getSelection?window.getSelection().removeAllRanges():document.getSelection.empty();
    console.log();
    this.innerHTML = '<input type="text"/>'
    var input = this.children[0];
    input.value = str;
    // 文本框处于选中状态
    input.select();
    // 当我们离开文本框的时候，把值赋予给 span
    input.onblur = function (e) {
      this.parentNode.innerHTML = this.value;
    }
    input.onkeyup =function(event){
      //  监听按下回车
      if(event.keyCode === 13){
        // 手动调用失去焦点事件
        this.blur();
      }
    }
  }
}

var tab = new Tab('#tab');