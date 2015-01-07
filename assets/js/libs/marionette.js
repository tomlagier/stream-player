! function (a, b) {
  if ("function" == typeof define && define.amd) define(["backbone", "underscore", "backbone.wreqr", "backbone.babysitter"], function (c, d) {
    return a.Marionette = a.Mn = b(a, c, d)
  });
  else if ("undefined" != typeof exports) {
    {
      var c = require("backbone"),
        d = require("underscore");
      require("backbone.wreqr"), require("backbone.babysitter")
    }
    module.exports = b(a, c, d)
  } else a.Marionette = a.Mn = b(a, a.Backbone, a._)
}(this, function (a, b, c) {
  "use strict";
  var d = a.Marionette,
    e = a.Mn,
    f = b.Marionette = {};
  f.VERSION = "2.3.0", f.noConflict = function () {
    return a.Marionette = d, a.Mn = e, this
  }, f.Deferred = b.$.Deferred, f.extend = b.Model.extend, f.isNodeAttached = function (a) {
    return b.$.contains(document.documentElement, a)
  }, f.getOption = function (a, b) {
    return a && b ? a.options && void 0 !== a.options[b] ? a.options[b] : a[b] : void 0
  }, f.proxyGetOption = function (a) {
    return f.getOption(this, a)
  }, f.normalizeMethods = function (a) {
    return c.reduce(a, function (a, b, d) {
      return c.isFunction(b) || (b = this[b]), b && (a[d] = b), a
    }, {}, this)
  }, f.normalizeUIString = function (a, b) {
    return a.replace(/@ui\.[a-zA-Z_$0-9]*/g, function (a) {
      return b[a.slice(4)]
    })
  }, f.normalizeUIKeys = function (a, b) {
    return c.reduce(a, function (a, c, d) {
      var e = f.normalizeUIString(d, b);
      return a[e] = c, a
    }, {})
  }, f.normalizeUIValues = function (a, b) {
    return c.each(a, function (d, e) {
      c.isString(d) && (a[e] = f.normalizeUIString(d, b))
    }), a
  }, f.actAsCollection = function (a, b) {
    var d = ["forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck"];
    c.each(d, function (d) {
      a[d] = function () {
        var a = c.values(c.result(this, b)),
          e = [a].concat(c.toArray(arguments));
        return c[d].apply(c, e)
      }
    })
  };
  var g = f.deprecate = function (a, b) {
    c.isObject(a) && (a = a.prev + " is going to be removed in the future. Please use " + a.next + " instead." + (a.url ? " See: " + a.url : "")), void 0 !== b && b || g._cache[a] || (g._warn("Deprecation warning: " + a), g._cache[a] = !0)
  };
  g._warn = "undefined" != typeof console && (console.warn || console.log) || function () {}, g._cache = {}, f._triggerMethod = function () {
    function a(a, b, c) {
      return c.toUpperCase()
    }
    var b = /(^|:)(\w)/gi;
    return function (d, e, f) {
      var g = arguments.length < 3;
      g && (f = e, e = f[0]);
      var h, i = "on" + e.replace(b, a),
        j = d[i];
      return c.isFunction(j) && (h = j.apply(d, g ? c.rest(f) : f)), c.isFunction(d.trigger) && (g + f.length > 1 ? d.trigger.apply(d, g ? f : [e].concat(c.rest(f, 0))) : d.trigger(e)), h
    }
  }(), f.triggerMethod = function () {
    return f._triggerMethod(this, arguments)
  }, f.triggerMethodOn = function (a) {
    var b = c.isFunction(a.triggerMethod) ? a.triggerMethod : f.triggerMethod;
    return b.apply(a, c.rest(arguments))
  }, f.MonitorDOMRefresh = function (a) {
    function b() {
      a._isShown = !0, e()
    }

    function d() {
      a._isRendered = !0, e()
    }

    function e() {
      a._isShown && a._isRendered && f.isNodeAttached(a.el) && c.isFunction(a.triggerMethod) && a.triggerMethod("dom:refresh")
    }
    a.on({
      show: b,
      render: d
    })
  },
  function (a) {
    function b(b, d, e, f) {
      var g = f.split(/\s+/);
      c.each(g, function (c) {
        var f = b[c];
        if (!f) throw new a.Error('Method "' + c + '" was configured as an event handler, but does not exist.');
        b.listenTo(d, e, f)
      })
    }

    function d(a, b, c, d) {
      a.listenTo(b, c, d)
    }

    function e(a, b, d, e) {
      var f = e.split(/\s+/);
      c.each(f, function (c) {
        var e = a[c];
        a.stopListening(b, d, e)
      })
    }

    function f(a, b, c, d) {
      a.stopListening(b, c, d)
    }

    function g(b, d, e, f, g) {
      if (d && e) {
        if (!c.isFunction(e) && !c.isObject(e)) throw new a.Error({
          message: "Bindings must be an object or function.",
          url: "marionette.functions.html#marionettebindentityevents"
        });
        c.isFunction(e) && (e = e.call(b)), c.each(e, function (a, e) {
          c.isFunction(a) ? f(b, d, e, a) : g(b, d, e, a)
        })
      }
    }
    a.bindEntityEvents = function (a, c, e) {
      g(a, c, e, d, b)
    }, a.unbindEntityEvents = function (a, b, c) {
      g(a, b, c, f, e)
    }, a.proxyBindEntityEvents = function (b, c) {
      return a.bindEntityEvents(this, b, c)
    }, a.proxyUnbindEntityEvents = function (b, c) {
      return a.unbindEntityEvents(this, b, c)
    }
  }(f);
  var h = ["description", "fileName", "lineNumber", "name", "message", "number"];
  return f.Error = f.extend.call(Error, {
    urlRoot: "http://marionettejs.com/docs/v" + f.VERSION + "/",
    constructor: function (a, b) {
      c.isObject(a) ? (b = a, a = b.message) : b || (b = {});
      var d = Error.call(this, a);
      c.extend(this, c.pick(d, h), c.pick(b, h)), this.captureStackTrace(), b.url && (this.url = this.urlRoot + b.url)
    },
    captureStackTrace: function () {
      Error.captureStackTrace && Error.captureStackTrace(this, f.Error)
    },
    toString: function () {
      return this.name + ": " + this.message + (this.url ? " See: " + this.url : "")
    }
  }), f.Error.extend = f.extend, f.Callbacks = function () {
    this._deferred = f.Deferred(), this._callbacks = []
  }, c.extend(f.Callbacks.prototype, {
    add: function (a, b) {
      var d = c.result(this._deferred, "promise");
      this._callbacks.push({
        cb: a,
        ctx: b
      }), d.then(function (c) {
        b && (c.context = b), a.call(c.context, c.options)
      })
    },
    run: function (a, b) {
      this._deferred.resolve({
        options: a,
        context: b
      })
    },
    reset: function () {
      var a = this._callbacks;
      this._deferred = f.Deferred(), this._callbacks = [], c.each(a, function (a) {
        this.add(a.cb, a.ctx)
      }, this)
    }
  }), f.Controller = function (a) {
    this.options = a || {}, c.isFunction(this.initialize) && this.initialize(this.options)
  }, f.Controller.extend = f.extend, c.extend(f.Controller.prototype, b.Events, {
    destroy: function () {
      return f._triggerMethod(this, "before:destroy", arguments), f._triggerMethod(this, "destroy", arguments), this.stopListening(), this.off(), this
    },
    triggerMethod: f.triggerMethod,
    getOption: f.proxyGetOption
  }), f.Object = function (a) {
    this.options = c.extend({}, c.result(this, "options"), a), this.initialize.apply(this, arguments)
  }, f.Object.extend = f.extend, c.extend(f.Object.prototype, b.Events, {
    initialize: function () {},
    destroy: function () {
      this.triggerMethod("before:destroy"), this.triggerMethod("destroy"), this.stopListening()
    },
    triggerMethod: f.triggerMethod,
    getOption: f.proxyGetOption,
    bindEntityEvents: f.proxyBindEntityEvents,
    unbindEntityEvents: f.proxyUnbindEntityEvents
  }), f.Region = f.Object.extend({
    constructor: function (a) {
      if (this.options = a || {}, this.el = this.getOption("el"), this.el = this.el instanceof b.$ ? this.el[0] : this.el, !this.el) throw new f.Error({
        name: "NoElError",
        message: 'An "el" must be specified for a region.'
      });
      this.$el = this.getEl(this.el), f.Object.call(this, a)
    },
    show: function (a, b) {
      if (this._ensureElement()) {
        this._ensureViewIsIntact(a);
        var c = b || {},
          d = a !== this.currentView,
          e = !!c.preventDestroy,
          g = !!c.forceShow,
          h = !!this.currentView,
          i = d && !e,
          j = d || g;
        if (h && this.triggerMethod("before:swapOut", this.currentView, this, b), this.currentView && delete this.currentView._parent, i ? this.empty() : h && j && this.currentView.off("destroy", this.empty, this), j) {
          a.once("destroy", this.empty, this), a.render(), a._parent = this, h && this.triggerMethod("before:swap", a, this, b), this.triggerMethod("before:show", a, this, b), f.triggerMethodOn(a, "before:show", a, this, b), h && this.triggerMethod("swapOut", this.currentView, this, b);
          var k = f.isNodeAttached(this.el),
            l = [],
            m = c.triggerBeforeAttach || this.triggerBeforeAttach,
            n = c.triggerAttach || this.triggerAttach;
          return k && m && (l = this._displayedViews(a), this._triggerAttach(l, "before:")), this.attachHtml(a), this.currentView = a, k && n && (l = this._displayedViews(a), this._triggerAttach(l)), h && this.triggerMethod("swap", a, this, b), this.triggerMethod("show", a, this, b), f.triggerMethodOn(a, "show", a, this, b), this
        }
        return this
      }
    },
    triggerBeforeAttach: !0,
    triggerAttach: !0,
    _triggerAttach: function (a, b) {
      var d = (b || "") + "attach";
      c.each(a, function (a) {
        f.triggerMethodOn(a, d, a, this)
      }, this)
    },
    _displayedViews: function (a) {
      return c.union([a], c.result(a, "_getNestedViews") || [])
    },
    _ensureElement: function () {
      if (c.isObject(this.el) || (this.$el = this.getEl(this.el), this.el = this.$el[0]), !this.$el || 0 === this.$el.length) {
        if (this.getOption("allowMissingEl")) return !1;
        throw new f.Error('An "el" ' + this.$el.selector + " must exist in DOM")
      }
      return !0
    },
    _ensureViewIsIntact: function (a) {
      if (!a) throw new f.Error({
        name: "ViewNotValid",
        message: "The view passed is undefined and therefore invalid. You must pass a view instance to show."
      });
      if (a.isDestroyed) throw new f.Error({
        name: "ViewDestroyedError",
        message: 'View (cid: "' + a.cid + '") has already been destroyed and cannot be used.'
      })
    },
    getEl: function (a) {
      return b.$(a)
    },
    attachHtml: function (a) {
      this.$el.html(""), this.el.appendChild(a.el)
    },
    empty: function () {
      var a = this.currentView;
      if (a) return a.off("destroy", this.empty, this), this.triggerMethod("before:empty", a), this._destroyView(), this.triggerMethod("empty", a), delete this.currentView, this
    },
    _destroyView: function () {
      var a = this.currentView;
      a.destroy && !a.isDestroyed ? a.destroy() : a.remove && (a.remove(), a.isDestroyed = !0)
    },
    attachView: function (a) {
      return this.currentView = a, this
    },
    hasView: function () {
      return !!this.currentView
    },
    reset: function () {
      return this.empty(), this.$el && (this.el = this.$el.selector), delete this.$el, this
    }
  }, {
    buildRegion: function (a, b) {
      if (c.isString(a)) return this._buildRegionFromSelector(a, b);
      if (a.selector || a.el || a.regionClass) return this._buildRegionFromObject(a, b);
      if (c.isFunction(a)) return this._buildRegionFromRegionClass(a);
      throw new f.Error({
        message: "Improper region configuration type.",
        url: "marionette.region.html#region-configuration-types"
      })
    },
    _buildRegionFromSelector: function (a, b) {
      return new b({
        el: a
      })
    },
    _buildRegionFromObject: function (a, d) {
      var e = a.regionClass || d,
        f = c.omit(a, "selector", "regionClass");
      a.selector && !f.el && (f.el = a.selector);
      var g = new e(f);
      return a.parentEl && (g.getEl = function (d) {
        if (c.isObject(d)) return b.$(d);
        var e = a.parentEl;
        return c.isFunction(e) && (e = e()), e.find(d)
      }), g
    },
    _buildRegionFromRegionClass: function (a) {
      return new a
    }
  }), f.RegionManager = f.Controller.extend({
    constructor: function (a) {
      this._regions = {}, f.Controller.call(this, a), this.addRegions(this.getOption("regions"))
    },
    addRegions: function (a, b) {
      c.isFunction(a) && (a = a.apply(this, arguments));
      var d = {};
      return c.each(a, function (a, e) {
        c.isString(a) && (a = {
          selector: a
        }), a.selector && (a = c.defaults({}, a, b));
        var f = this.addRegion(e, a);
        d[e] = f
      }, this), d
    },
    addRegion: function (a, b) {
      var c;
      return c = b instanceof f.Region ? b : f.Region.buildRegion(b, f.Region), this.triggerMethod("before:add:region", a, c), c._parent = this, this._store(a, c), this.triggerMethod("add:region", a, c), c
    },
    get: function (a) {
      return this._regions[a]
    },
    getRegions: function () {
      return c.clone(this._regions)
    },
    removeRegion: function (a) {
      var b = this._regions[a];
      return this._remove(a, b), b
    },
    removeRegions: function () {
      var a = this.getRegions();
      return c.each(this._regions, function (a, b) {
        this._remove(b, a)
      }, this), a
    },
    emptyRegions: function () {
      var a = this.getRegions();
      return c.invoke(a, "empty"), a
    },
    destroy: function () {
      return this.removeRegions(), f.Controller.prototype.destroy.apply(this, arguments)
    },
    _store: function (a, b) {
      this._regions[a] = b, this._setLength()
    },
    _remove: function (a, b) {
      this.triggerMethod("before:remove:region", a, b), b.empty(), b.stopListening(), delete b._parent, delete this._regions[a], this._setLength(), this.triggerMethod("remove:region", a, b)
    },
    _setLength: function () {
      this.length = c.size(this._regions)
    }
  }), f.actAsCollection(f.RegionManager.prototype, "_regions"), f.TemplateCache = function (a) {
    this.templateId = a
  }, c.extend(f.TemplateCache, {
    templateCaches: {},
    get: function (a) {
      var b = this.templateCaches[a];
      return b || (b = new f.TemplateCache(a), this.templateCaches[a] = b), b.load()
    },
    clear: function () {
      var a, b = c.toArray(arguments),
        d = b.length;
      if (d > 0)
        for (a = 0; d > a; a++) delete this.templateCaches[b[a]];
      else this.templateCaches = {}
    }
  }), c.extend(f.TemplateCache.prototype, {
    load: function () {
      if (this.compiledTemplate) return this.compiledTemplate;
      var a = this.loadTemplate(this.templateId);
      return this.compiledTemplate = this.compileTemplate(a), this.compiledTemplate
    },
    loadTemplate: function (a) {
      var c = b.$(a).html();
      if (!c || 0 === c.length) throw new f.Error({
        name: "NoTemplateError",
        message: 'Could not find template: "' + a + '"'
      });
      return c
    },
    compileTemplate: function (a) {
      return c.template(a)
    }
  }), f.Renderer = {
    render: function (a, b) {
      if (!a) throw new f.Error({
        name: "TemplateNotFoundError",
        message: "Cannot render the template since its false, null or undefined."
      });
      var c;
      return (c = "function" == typeof a ? a : f.TemplateCache.get(a))(b)
    }
  }, f.View = b.View.extend({
    constructor: function (a) {
      c.bindAll(this, "render"), a = c.isFunction(a) ? a.call(this) : a, this.options = c.extend({}, c.result(this, "options"), a), this._behaviors = f.Behaviors(this), b.View.apply(this, arguments), f.MonitorDOMRefresh(this), this.on("show", this.onShowCalled)
    },
    getTemplate: function () {
      return this.getOption("template")
    },
    serializeModel: function (a) {
      return a.toJSON.apply(a, c.rest(arguments))
    },
    mixinTemplateHelpers: function (a) {
      a = a || {};
      var b = this.getOption("templateHelpers");
      return c.isFunction(b) && (b = b.call(this)), c.extend(a, b)
    },
    normalizeUIKeys: function (a) {
      var b = c.result(this, "_uiBindings");
      return f.normalizeUIKeys(a, b || c.result(this, "ui"))
    },
    normalizeUIValues: function (a) {
      var b = c.result(this, "ui"),
        d = c.result(this, "_uiBindings");
      return f.normalizeUIValues(a, d || b)
    },
    configureTriggers: function () {
      if (this.triggers) {
        var a = this.normalizeUIKeys(c.result(this, "triggers"));
        return c.reduce(a, function (a, b, c) {
          return a[c] = this._buildViewTrigger(b), a
        }, {}, this)
      }
    },
    delegateEvents: function (a) {
      return this._delegateDOMEvents(a), this.bindEntityEvents(this.model, this.getOption("modelEvents")), this.bindEntityEvents(this.collection, this.getOption("collectionEvents")), c.each(this._behaviors, function (a) {
        a.bindEntityEvents(this.model, a.getOption("modelEvents")), a.bindEntityEvents(this.collection, a.getOption("collectionEvents"))
      }, this), this
    },
    _delegateDOMEvents: function (a) {
      var d = a || this.events;
      c.isFunction(d) && (d = d.call(this)), d = this.normalizeUIKeys(d), c.isUndefined(a) && (this.events = d);
      var e = {},
        f = c.result(this, "behaviorEvents") || {},
        g = this.configureTriggers(),
        h = c.result(this, "behaviorTriggers") || {};
      c.extend(e, f, d, g, h), b.View.prototype.delegateEvents.call(this, e)
    },
    undelegateEvents: function () {
      return b.View.prototype.undelegateEvents.apply(this, arguments), this.unbindEntityEvents(this.model, this.getOption("modelEvents")), this.unbindEntityEvents(this.collection, this.getOption("collectionEvents")), c.each(this._behaviors, function (a) {
        a.unbindEntityEvents(this.model, a.getOption("modelEvents")), a.unbindEntityEvents(this.collection, a.getOption("collectionEvents"))
      }, this), this
    },
    onShowCalled: function () {},
    _ensureViewIsIntact: function () {
      if (this.isDestroyed) throw new f.Error({
        name: "ViewDestroyedError",
        message: 'View (cid: "' + this.cid + '") has already been destroyed and cannot be used.'
      })
    },
    destroy: function () {
      if (!this.isDestroyed) {
        var a = c.toArray(arguments);
        return this.triggerMethod.apply(this, ["before:destroy"].concat(a)), this.isDestroyed = !0, this.triggerMethod.apply(this, ["destroy"].concat(a)), this.unbindUIElements(), this.remove(), c.invoke(this._behaviors, "destroy", a), this
      }
    },
    bindUIElements: function () {
      this._bindUIElements(), c.invoke(this._behaviors, this._bindUIElements)
    },
    _bindUIElements: function () {
      if (this.ui) {
        this._uiBindings || (this._uiBindings = this.ui);
        var a = c.result(this, "_uiBindings");
        this.ui = {}, c.each(c.keys(a), function (b) {
          var c = a[b];
          this.ui[b] = this.$(c)
        }, this)
      }
    },
    unbindUIElements: function () {
      this._unbindUIElements(), c.invoke(this._behaviors, this._unbindUIElements)
    },
    _unbindUIElements: function () {
      this.ui && this._uiBindings && (c.each(this.ui, function (a, b) {
        delete this.ui[b]
      }, this), this.ui = this._uiBindings, delete this._uiBindings)
    },
    _buildViewTrigger: function (a) {
      var b = c.isObject(a),
        d = c.defaults({}, b ? a : {}, {
          preventDefault: !0,
          stopPropagation: !0
        }),
        e = b ? d.event : a;
      return function (a) {
        a && (a.preventDefault && d.preventDefault && a.preventDefault(), a.stopPropagation && d.stopPropagation && a.stopPropagation());
        var b = {
          view: this,
          model: this.model,
          collection: this.collection
        };
        this.triggerMethod(e, b)
      }
    },
    setElement: function () {
      var a = b.View.prototype.setElement.apply(this, arguments);
      return c.invoke(this._behaviors, "proxyViewProperties", this), a
    },
    triggerMethod: function () {
      for (var a = f._triggerMethod, b = a(this, arguments), c = this._behaviors, d = 0, e = c && c.length; e > d; d++) a(c[d], arguments);
      return b
    },
    _getImmediateChildren: function () {
      return []
    },
    _getNestedViews: function () {
      var a = this._getImmediateChildren();
      return a.length ? c.reduce(a, function (a, b) {
        return b._getNestedViews ? a.concat(b._getNestedViews()) : a
      }, a) : a
    },
    normalizeMethods: f.normalizeMethods,
    getOption: f.proxyGetOption,
    bindEntityEvents: f.proxyBindEntityEvents,
    unbindEntityEvents: f.proxyUnbindEntityEvents
  }), f.ItemView = f.View.extend({
    constructor: function () {
      f.View.apply(this, arguments)
    },
    serializeData: function () {
      if (!this.model && !this.collection) return {};
      var a = [this.model || this.collection];
      return arguments.length && a.push.apply(a, arguments), this.model ? this.serializeModel.apply(this, a) : {
        items: this.serializeCollection.apply(this, a)
      }
    },
    serializeCollection: function (a) {
      return a.toJSON.apply(a, c.rest(arguments))
    },
    render: function () {
      return this._ensureViewIsIntact(), this.triggerMethod("before:render", this), this._renderTemplate(), this.bindUIElements(), this.triggerMethod("render", this), this
    },
    _renderTemplate: function () {
      var a = this.getTemplate();
      if (a !== !1) {
        if (!a) throw new f.Error({
          name: "UndefinedTemplateError",
          message: "Cannot render the template since it is null or undefined."
        });
        var b = this.serializeData();
        b = this.mixinTemplateHelpers(b);
        var c = f.Renderer.render(a, b, this);
        return this.attachElContent(c), this
      }
    },
    attachElContent: function (a) {
      return this.$el.html(a), this
    }
  }), f.CollectionView = f.View.extend({
    childViewEventPrefix: "childview",
    constructor: function (a) {
      var b = a || {};
      c.isUndefined(this.sort) && (this.sort = c.isUndefined(b.sort) ? !0 : b.sort), this.once("render", this._initialEvents), this._initChildViewStorage(), f.View.apply(this, arguments), this.initRenderBuffer()
    },
    initRenderBuffer: function () {
      this.elBuffer = document.createDocumentFragment(), this._bufferedChildren = []
    },
    startBuffering: function () {
      this.initRenderBuffer(), this.isBuffering = !0
    },
    endBuffering: function () {
      this.isBuffering = !1, this._triggerBeforeShowBufferedChildren(), this.attachBuffer(this, this.elBuffer), this._triggerShowBufferedChildren(), this.initRenderBuffer()
    },
    _triggerBeforeShowBufferedChildren: function () {
      this._isShown && c.each(this._bufferedChildren, c.partial(this._triggerMethodOnChild, "before:show"))
    },
    _triggerShowBufferedChildren: function () {
      this._isShown && (c.each(this._bufferedChildren, c.partial(this._triggerMethodOnChild, "show")), this._bufferedChildren = [])
    },
    _triggerMethodOnChild: function (a, b) {
      f.triggerMethodOn(b, a)
    },
    _initialEvents: function () {
      this.collection && (this.listenTo(this.collection, "add", this._onCollectionAdd), this.listenTo(this.collection, "remove", this._onCollectionRemove), this.listenTo(this.collection, "reset", this.render), this.sort && this.listenTo(this.collection, "sort", this._sortViews))
    },
    _onCollectionAdd: function (a) {
      this.destroyEmptyView();
      var b = this.getChildView(a),
        c = this.collection.indexOf(a);
      this.addChild(a, b, c)
    },
    _onCollectionRemove: function (a) {
      var b = this.children.findByModel(a);
      this.removeChildView(b), this.checkEmpty()
    },
    onShowCalled: function () {
      this.children.each(c.partial(this._triggerMethodOnChild, "show"))
    },
    render: function () {
      return this._ensureViewIsIntact(), this.triggerMethod("before:render", this), this._renderChildren(), this.triggerMethod("render", this), this
    },
    resortView: function () {
      this.render()
    },
    _sortViews: function () {
      var a = this.collection.find(function (a, b) {
        var c = this.children.findByModel(a);
        return !c || c._index !== b
      }, this);
      a && this.resortView()
    },
    _emptyViewIndex: -1,
    _renderChildren: function () {
      this.destroyEmptyView(), this.destroyChildren(), this.isEmpty(this.collection) ? this.showEmptyView() : (this.triggerMethod("before:render:collection", this), this.startBuffering(), this.showCollection(), this.endBuffering(), this.triggerMethod("render:collection", this))
    },
    showCollection: function () {
      var a;
      this.collection.each(function (b, c) {
        a = this.getChildView(b), this.addChild(b, a, c)
      }, this)
    },
    showEmptyView: function () {
      var a = this.getEmptyView();
      if (a && !this._showingEmptyView) {
        this.triggerMethod("before:render:empty"), this._showingEmptyView = !0;
        var c = new b.Model;
        this.addEmptyView(c, a), this.triggerMethod("render:empty")
      }
    },
    destroyEmptyView: function () {
      this._showingEmptyView && (this.triggerMethod("before:remove:empty"), this.destroyChildren(), delete this._showingEmptyView, this.triggerMethod("remove:empty"))
    },
    getEmptyView: function () {
      return this.getOption("emptyView")
    },
    addEmptyView: function (a, b) {
      var d = this.getOption("emptyViewOptions") || this.getOption("childViewOptions");
      c.isFunction(d) && (d = d.call(this, a, this._emptyViewIndex));
      var e = this.buildChildView(a, b, d);
      e._parent = this, this.proxyChildEvents(e), this._isShown && f.triggerMethodOn(e, "before:show"), this.children.add(e), this.renderChildView(e, this._emptyViewIndex), this._isShown && f.triggerMethodOn(e, "show")
    },
    getChildView: function () {
      var a = this.getOption("childView");
      if (!a) throw new f.Error({
        name: "NoChildViewError",
        message: 'A "childView" must be specified'
      });
      return a
    },
    addChild: function (a, b, d) {
      var e = this.getOption("childViewOptions");
      c.isFunction(e) && (e = e.call(this, a, d));
      var f = this.buildChildView(a, b, e);
      return this._updateIndices(f, !0, d), this._addChildView(f, d), f._parent = this, f
    },
    _updateIndices: function (a, b, c) {
      this.sort && (b ? (a._index = c, this.children.each(function (b) {
        b._index >= a._index && b._index++
      })) : this.children.each(function (b) {
        b._index >= a._index && b._index--
      }))
    },
    _addChildView: function (a, b) {
      this.proxyChildEvents(a), this.triggerMethod("before:add:child", a), this.children.add(a), this.renderChildView(a, b), this._isShown && !this.isBuffering && f.triggerMethodOn(a, "show"), this.triggerMethod("add:child", a)
    },
    renderChildView: function (a, b) {
      return a.render(), this.attachHtml(this, a, b), a
    },
    buildChildView: function (a, b, d) {
      var e = c.extend({
        model: a
      }, d);
      return new b(e)
    },
    removeChildView: function (a) {
      return a && (this.triggerMethod("before:remove:child", a), a.destroy ? a.destroy() : a.remove && a.remove(), delete a._parent, this.stopListening(a), this.children.remove(a), this.triggerMethod("remove:child", a), this._updateIndices(a, !1)), a
    },
    isEmpty: function () {
      return !this.collection || 0 === this.collection.length
    },
    checkEmpty: function () {
      this.isEmpty(this.collection) && this.showEmptyView()
    },
    attachBuffer: function (a, b) {
      a.$el.append(b)
    },
    attachHtml: function (a, b, c) {
      a.isBuffering ? (a.elBuffer.appendChild(b.el), a._bufferedChildren.push(b)) : a._insertBefore(b, c) || a._insertAfter(b)
    },
    _insertBefore: function (a, b) {
      var c, d = this.sort && b < this.children.length - 1;
      return d && (c = this.children.find(function (a) {
        return a._index === b + 1
      })), c ? (c.$el.before(a.el), !0) : !1
    },
    _insertAfter: function (a) {
      this.$el.append(a.el)
    },
    _initChildViewStorage: function () {
      this.children = new b.ChildViewContainer
    },
    destroy: function () {
      return this.isDestroyed ? void 0 : (this.triggerMethod("before:destroy:collection"), this.destroyChildren(), this.triggerMethod("destroy:collection"), f.View.prototype.destroy.apply(this, arguments))
    },
    destroyChildren: function () {
      var a = this.children.map(c.identity);
      return this.children.each(this.removeChildView, this), this.checkEmpty(), a
    },
    proxyChildEvents: function (a) {
      var b = this.getOption("childViewEventPrefix");
      this.listenTo(a, "all", function () {
        var d = c.toArray(arguments),
          e = d[0],
          f = this.normalizeMethods(c.result(this, "childEvents"));
        d[0] = b + ":" + e, d.splice(1, 0, a), "undefined" != typeof f && c.isFunction(f[e]) && f[e].apply(this, d.slice(1)), this.triggerMethod.apply(this, d)
      }, this)
    },
    _getImmediateChildren: function () {
      return c.values(this.children._views)
    }
  }), f.CompositeView = f.CollectionView.extend({
    constructor: function () {
      f.CollectionView.apply(this, arguments)
    },
    _initialEvents: function () {
      this.collection && (this.listenTo(this.collection, "add", this._onCollectionAdd), this.listenTo(this.collection, "remove", this._onCollectionRemove), this.listenTo(this.collection, "reset", this._renderChildren), this.sort && this.listenTo(this.collection, "sort", this._sortViews))
    },
    getChildView: function () {
      var a = this.getOption("childView") || this.constructor;
      return a
    },
    serializeData: function () {
      var a = {};
      return this.model && (a = c.partial(this.serializeModel, this.model).apply(this, arguments)), a
    },
    render: function () {
      return this._ensureViewIsIntact(), this.isRendered = !0, this.resetChildViewContainer(), this.triggerMethod("before:render", this), this._renderTemplate(), this._renderChildren(), this.triggerMethod("render", this), this
    },
    _renderChildren: function () {
      this.isRendered && f.CollectionView.prototype._renderChildren.call(this)
    },
    _renderTemplate: function () {
      var a = {};
      a = this.serializeData(), a = this.mixinTemplateHelpers(a), this.triggerMethod("before:render:template");
      var b = this.getTemplate(),
        c = f.Renderer.render(b, a, this);
      this.attachElContent(c), this.bindUIElements(), this.triggerMethod("render:template")
    },
    attachElContent: function (a) {
      return this.$el.html(a), this
    },
    attachBuffer: function (a, b) {
      var c = this.getChildViewContainer(a);
      c.append(b)
    },
    _insertAfter: function (a) {
      var b = this.getChildViewContainer(this, a);
      b.append(a.el)
    },
    getChildViewContainer: function (a) {
      if ("$childViewContainer" in a) return a.$childViewContainer;
      var b, d = f.getOption(a, "childViewContainer");
      if (d) {
        var e = c.isFunction(d) ? d.call(a) : d;
        if (b = "@" === e.charAt(0) && a.ui ? a.ui[e.substr(4)] : a.$(e), b.length <= 0) throw new f.Error({
          name: "ChildViewContainerMissingError",
          message: 'The specified "childViewContainer" was not found: ' + a.childViewContainer
        })
      } else b = a.$el;
      return a.$childViewContainer = b, b
    },
    resetChildViewContainer: function () {
      this.$childViewContainer && delete this.$childViewContainer
    }
  }), f.LayoutView = f.ItemView.extend({
    regionClass: f.Region,
    constructor: function (a) {
      a = a || {}, this._firstRender = !0, this._initializeRegions(a), f.ItemView.call(this, a)
    },
    render: function () {
      return this._ensureViewIsIntact(), this._firstRender ? this._firstRender = !1 : this._reInitializeRegions(), f.ItemView.prototype.render.apply(this, arguments)
    },
    destroy: function () {
      return this.isDestroyed ? this : (this.regionManager.destroy(), f.ItemView.prototype.destroy.apply(this, arguments))
    },
    addRegion: function (a, b) {
      var c = {};
      return c[a] = b, this._buildRegions(c)[a]
    },
    addRegions: function (a) {
      return this.regions = c.extend({}, this.regions, a), this._buildRegions(a)
    },
    removeRegion: function (a) {
      return delete this.regions[a], this.regionManager.removeRegion(a)
    },
    getRegion: function (a) {
      return this.regionManager.get(a)
    },
    getRegions: function () {
      return this.regionManager.getRegions()
    },
    _buildRegions: function (a) {
      var b = {
        regionClass: this.getOption("regionClass"),
        parentEl: c.partial(c.result, this, "$el")
      };
      return this.regionManager.addRegions(a, b)
    },
    _initializeRegions: function (a) {
      var b;
      this._initRegionManager(), b = c.isFunction(this.regions) ? this.regions(a) : this.regions || {};
      var d = this.getOption.call(a, "regions");
      c.isFunction(d) && (d = d.call(this, a)), c.extend(b, d), b = this.normalizeUIValues(b), this.addRegions(b)
    },
    _reInitializeRegions: function () {
      this.regionManager.invoke("reset")
    },
    getRegionManager: function () {
      return new f.RegionManager
    },
    _initRegionManager: function () {
      this.regionManager = this.getRegionManager(), this.regionManager._parent = this, this.listenTo(this.regionManager, "before:add:region", function (a) {
        this.triggerMethod("before:add:region", a)
      }), this.listenTo(this.regionManager, "add:region", function (a, b) {
        this[a] = b, this.triggerMethod("add:region", a, b)
      }), this.listenTo(this.regionManager, "before:remove:region", function (a) {
        this.triggerMethod("before:remove:region", a)
      }), this.listenTo(this.regionManager, "remove:region", function (a, b) {
        delete this[a], this.triggerMethod("remove:region", a, b)
      })
    },
    _getImmediateChildren: function () {
      return c.chain(this.regionManager.getRegions()).pluck("currentView").compact().value()
    }
  }), f.Behavior = f.Object.extend({
    constructor: function (a, b) {
      this.view = b, this.defaults = c.result(this, "defaults") || {}, this.options = c.extend({}, this.defaults, a), f.Object.apply(this, arguments)
    },
    $: function () {
      return this.view.$.apply(this.view, arguments)
    },
    destroy: function () {
      this.stopListening()
    },
    proxyViewProperties: function (a) {
      this.$el = a.$el, this.el = a.el
    }
  }), f.Behaviors = function (a, b) {
    function c(a, d) {
      return b.isObject(a.behaviors) ? (d = c.parseBehaviors(a, d || b.result(a, "behaviors")), c.wrap(a, d, b.keys(e)), d) : {}
    }

    function d(a, c) {
      this._view = a, this._viewUI = b.result(a, "ui"), this._behaviors = c, this._triggers = {}
    }
    var e = {
      behaviorTriggers: function (a, b) {
        var c = new d(this, b);
        return c.buildBehaviorTriggers()
      },
      behaviorEvents: function (c, d) {
        var e = {},
          f = b.result(this, "ui");
        return b.each(d, function (c, d) {
          var g = {},
            h = b.clone(b.result(c, "events")) || {},
            i = b.result(c, "ui"),
            j = b.extend({}, f, i);
          h = a.normalizeUIKeys(h, j), b.each(b.keys(h), function (a) {
            var e = new Array(d + 2).join(" "),
              f = a + e,
              i = b.isFunction(h[a]) ? h[a] : c[h[a]];
            g[f] = b.bind(i, c)
          }), e = b.extend(e, g)
        }), e
      }
    };
    return b.extend(c, {
      behaviorsLookup: function () {
        throw new a.Error({
          message: "You must define where your behaviors are stored.",
          url: "marionette.behaviors.html#behaviorslookup"
        })
      },
      getBehaviorClass: function (a, d) {
        return a.behaviorClass ? a.behaviorClass : b.isFunction(c.behaviorsLookup) ? c.behaviorsLookup.apply(this, arguments)[d] : c.behaviorsLookup[d]
      },
      parseBehaviors: function (a, d) {
        return b.chain(d).map(function (d, e) {
          var f = c.getBehaviorClass(d, e),
            g = new f(d, a),
            h = c.parseBehaviors(a, b.result(g, "behaviors"));
          return [g].concat(h)
        }).flatten().value()
      },
      wrap: function (a, c, d) {
        b.each(d, function (d) {
          a[d] = b.partial(e[d], a[d], c)
        })
      }
    }), b.extend(d.prototype, {
      buildBehaviorTriggers: function () {
        return b.each(this._behaviors, this._buildTriggerHandlersForBehavior, this), this._triggers
      },
      _buildTriggerHandlersForBehavior: function (c, d) {
        var e = b.extend({}, this._viewUI, b.result(c, "ui")),
          f = b.clone(b.result(c, "triggers")) || {};
        f = a.normalizeUIKeys(f, e), b.each(f, b.partial(this._setHandlerForBehavior, c, d), this)
      },
      _setHandlerForBehavior: function (a, b, c, d) {
        var e = d.replace(/^\S+/, function (a) {
          return a + ".behaviortriggers" + b
        });
        this._triggers[e] = this._view._buildViewTrigger(c)
      }
    }), c
  }(f, c), f.AppRouter = b.Router.extend({
    constructor: function (a) {
      this.options = a || {}, b.Router.apply(this, arguments);
      var c = this.getOption("appRoutes"),
        d = this._getController();
      this.processAppRoutes(d, c), this.on("route", this._processOnRoute, this)
    },
    appRoute: function (a, b) {
      var c = this._getController();
      this._addAppRoute(c, a, b)
    },
    _processOnRoute: function (a, b) {
      if (c.isFunction(this.onRoute)) {
        var d = c.invert(this.getOption("appRoutes"))[a];
        this.onRoute(a, d, b)
      }
    },
    processAppRoutes: function (a, b) {
      if (b) {
        var d = c.keys(b).reverse();
        c.each(d, function (c) {
          this._addAppRoute(a, c, b[c])
        }, this)
      }
    },
    _getController: function () {
      return this.getOption("controller")
    },
    _addAppRoute: function (a, b, d) {
      var e = a[d];
      if (!e) throw new f.Error('Method "' + d + '" was not found on the controller');
      this.route(b, d, c.bind(e, a))
    },
    getOption: f.proxyGetOption,
    triggerMethod: f.triggerMethod,
    bindEntityEvents: f.proxyBindEntityEvents,
    unbindEntityEvents: f.proxyUnbindEntityEvents
  }), f.Application = f.Object.extend({
    constructor: function (a) {
      this._initializeRegions(a), this._initCallbacks = new f.Callbacks, this.submodules = {}, c.extend(this, a), this._initChannel(), f.Object.call(this, a)
    },
    execute: function () {
      this.commands.execute.apply(this.commands, arguments)
    },
    request: function () {
      return this.reqres.request.apply(this.reqres, arguments)
    },
    addInitializer: function (a) {
      this._initCallbacks.add(a)
    },
    start: function (a) {
      this.triggerMethod("before:start", a), this._initCallbacks.run(a, this), this.triggerMethod("start", a)
    },
    addRegions: function (a) {
      return this._regionManager.addRegions(a)
    },
    emptyRegions: function () {
      return this._regionManager.emptyRegions()
    },
    removeRegion: function (a) {
      return this._regionManager.removeRegion(a)
    },
    getRegion: function (a) {
      return this._regionManager.get(a)
    },
    getRegions: function () {
      return this._regionManager.getRegions()
    },
    module: function (a, b) {
      var d = f.Module.getClass(b),
        e = c.toArray(arguments);
      return e.unshift(this), d.create.apply(d, e)
    },
    getRegionManager: function () {
      return new f.RegionManager
    },
    _initializeRegions: function (a) {
      var b = c.isFunction(this.regions) ? this.regions(a) : this.regions || {};
      this._initRegionManager();
      var d = f.getOption(a, "regions");
      return c.isFunction(d) && (d = d.call(this, a)), c.extend(b, d), this.addRegions(b), this
    },
    _initRegionManager: function () {
      this._regionManager = this.getRegionManager(), this._regionManager._parent = this, this.listenTo(this._regionManager, "before:add:region", function () {
        f._triggerMethod(this, "before:add:region", arguments)
      }), this.listenTo(this._regionManager, "add:region", function (a, b) {
        this[a] = b, f._triggerMethod(this, "add:region", arguments)
      }), this.listenTo(this._regionManager, "before:remove:region", function () {
        f._triggerMethod(this, "before:remove:region", arguments)
      }), this.listenTo(this._regionManager, "remove:region", function (a) {
        delete this[a], f._triggerMethod(this, "remove:region", arguments)
      })
    },
    _initChannel: function () {
      this.channelName = c.result(this, "channelName") || "global", this.channel = c.result(this, "channel") || b.Wreqr.radio.channel(this.channelName), this.vent = c.result(this, "vent") || this.channel.vent, this.commands = c.result(this, "commands") || this.channel.commands, this.reqres = c.result(this, "reqres") || this.channel.reqres
    }
  }), f.Module = function (a, b, d) {
    this.moduleName = a, this.options = c.extend({}, this.options, d), this.initialize = d.initialize || this.initialize, this.submodules = {}, this._setupInitializersAndFinalizers(), this.app = b, c.isFunction(this.initialize) && this.initialize(a, b, this.options)
  }, f.Module.extend = f.extend, c.extend(f.Module.prototype, b.Events, {
    startWithParent: !0,
    initialize: function () {},
    addInitializer: function (a) {
      this._initializerCallbacks.add(a)
    },
    addFinalizer: function (a) {
      this._finalizerCallbacks.add(a)
    },
    start: function (a) {
      this._isInitialized || (c.each(this.submodules, function (b) {
        b.startWithParent && b.start(a)
      }), this.triggerMethod("before:start", a), this._initializerCallbacks.run(a, this), this._isInitialized = !0, this.triggerMethod("start", a))
    },
    stop: function () {
      this._isInitialized && (this._isInitialized = !1, this.triggerMethod("before:stop"), c.invoke(this.submodules, "stop"), this._finalizerCallbacks.run(void 0, this), this._initializerCallbacks.reset(), this._finalizerCallbacks.reset(), this.triggerMethod("stop"))
    },
    addDefinition: function (a, b) {
      this._runModuleDefinition(a, b)
    },
    _runModuleDefinition: function (a, d) {
      if (a) {
        var e = c.flatten([this, this.app, b, f, b.$, c, d]);
        a.apply(this, e)
      }
    },
    _setupInitializersAndFinalizers: function () {
      this._initializerCallbacks = new f.Callbacks, this._finalizerCallbacks = new f.Callbacks
    },
    triggerMethod: f.triggerMethod
  }), c.extend(f.Module, {
    create: function (a, b, d) {
      var e = a,
        f = c.rest(arguments, 3);
      b = b.split(".");
      var g = b.length,
        h = [];
      return h[g - 1] = d, c.each(b, function (b, c) {
        var g = e;
        e = this._getModule(g, b, a, d), this._addModuleDefinition(g, e, h[c], f)
      }, this), e
    },
    _getModule: function (a, b, d, e) {
      var f = c.extend({}, e),
        g = this.getClass(e),
        h = a[b];
      return h || (h = new g(b, d, f), a[b] = h, a.submodules[b] = h), h
    },
    getClass: function (a) {
      var b = f.Module;
      return a ? a.prototype instanceof b ? a : a.moduleClass || b : b
    },
    _addModuleDefinition: function (a, b, c, d) {
      var e = this._getDefine(c),
        f = this._getStartWithParent(c, b);
      e && b.addDefinition(e, d), this._addStartWithParent(a, b, f)
    },
    _getStartWithParent: function (a, b) {
      var d;
      return c.isFunction(a) && a.prototype instanceof f.Module ? (d = b.constructor.prototype.startWithParent, c.isUndefined(d) ? !0 : d) : c.isObject(a) ? (d = a.startWithParent, c.isUndefined(d) ? !0 : d) : !0
    },
    _getDefine: function (a) {
      return !c.isFunction(a) || a.prototype instanceof f.Module ? c.isObject(a) ? a.define : null : a
    },
    _addStartWithParent: function (a, b, c) {
      b.startWithParent = b.startWithParent && c, b.startWithParent && !b.startWithParentIsConfigured && (b.startWithParentIsConfigured = !0, a.addInitializer(function (a) {
        b.startWithParent && b.start(a)
      }))
    }
  }), f
});
//# sourceMappingURL=backbone.marionette.map