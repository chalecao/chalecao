var util = hexo.util,
  extend = hexo.extend.filter;
  format = util.format;
var description = function(data, callback){
  if (!data.description){
    var text = data.content.replace(/<\/(p|br)>/i,'$&\n')
                .replace(/<pre>[\s\S]+?<\/pre>/g,'')
                .replace('\n','');
    text = format.strip_html(text).trim();
    if (text.length > 100){
      var i = 100;
      for(len=text.length;i<len;++i){
        var ch = text[i];
        switch(ch){
          case '\r':case '\n':
            break;
          default:
            continue;
        }
        break;
      }
      text = text.substr(0,i);
    }
    data.description = text;
  }
  callback(null, data);
};

var case_find = function(name){
  var find = String(name).toUpperCase();
  return function(data){
    return find == String(data).toUpperCase();
  }
}

var CreateCategory = function(data, next){
  if (!data.categories) data.categories = [];

  var categories = data.categories;

  if (!categories) return next();

  var _cats = categories.slice(0);
  var source = data.source.split('/');
  if (source.length > 2){
    source = source.slice(1,-1);
    source = source.join('/');
    if (_cats.indexOf(source) == -1)  _cats.push(source);
  }

  if (!_cats.length) return next();

  var model = hexo.model,
    Category = model('Category'),
    i = 0;



  _cats.forEach(function(name){
    var nx = name.split('/');
    nx.forEach(function(name,j){
      var doc = Category.get(name);

      if (!doc){
        var query = {
          name: {$where: case_find(name)},
          parent: j == 0 ? {$exist: false} : categories[i - 1]
        };

        doc = Category.findOne(query);
      }

      if (doc){
        categories[i] = doc._id;
      } else {
        var data = {
          name: name
        };

        if (j > 0){
          data.parent = categories[i - 1];
        }

        Category.insert(data, function(category){
          categories[i] = category._id;
        });
      }
      ++i;
    });
  });

  next();
};

var CreateTag = function(data, next){
  var tags = data.tags;

  if (!tags || !tags.length) return next();

  var model = hexo.model,
    _tags = [],
    Tag = model('Tag');

  tags.forEach(function(name, i){
    var doc = Tag.get(name) || Tag.findOne({name: {$where: case_find(name)}});

    if (doc){
      if (_tags.indexOf(doc._id) == -1) _tags.push(doc._id);
    } else {
      Tag.insert({name: name}, function(tag){
        _tags.push(tag._id);
      });
    }
  });

  data.tags = _tags.slice(0);
  next();
};

var replaceVars = function(data,next){
  data.content = data.content.replace(/\[CDN_URL\]:/ig,usercfg.themeconfig.CDN_URL);
  next();
}


var ConfigWidgets = function(data, next){
  var widgets = data.widgets;

  if (!widgets) return next();

  for(var k in widgets){
    var w=widgets[k];
    if (w){
      w.forEach(function(n,i){
        if (typeof n !== 'object'){
          var y=n.indexOf(',');
          if (y > 0) w[i]={name: n.substr(0,y),options: JSON.parse(n.slice(y+1))};
        }
      })
    }
  }
  next();
}
extend.register('post', description);

//֧�ֶ��һ������,��Ŀ¼����
//support "multiple first-level categories" and "Folder as category"
extend.register('pre', CreateCategory);
extend.register('pre', CreateTag);
extend.register('pre', ConfigWidgets);
extend.register('post', replaceVars);