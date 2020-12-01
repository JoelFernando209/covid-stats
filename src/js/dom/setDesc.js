export class SetDesc {
  
  getParentClass(el) {
    const parentClass = el.parentNode.className;
    return parentClass;
  }
  
  identifyClass(arr, target) {
    let res = '';
    
    arr.forEach(el => {
      if(el === target) {
        res = el;
      }
    });
    
    return res;
  }
  
  getTextClass(targetClass, obj) {
    switch (targetClass) {
      case 'main__item--infections':
        return obj.Global.TotalConfirmed;
      case 'main__item--active-infections':
        return obj.Global.NewConfirmed;
      case 'main__item--deaths':
        return obj.Global.TotalDeaths;
      case 'main__item--new-deaths':
        return obj.Global.NewDeaths;
    }
  }
}