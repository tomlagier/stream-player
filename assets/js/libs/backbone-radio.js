// Backbone.Radio v0.8.4

! function (a, b) {
  if ("function" == typeof define && define.amd) define(["backbone", "underscore"], function (a, c) {
    return b(a, c)
  });
  else if ("undefined" != typeof exports) {
    var c = require("backbone"),
      d = require("underscore");
    module.exports = b(c, d)
  } else b(a.Backbone, a._)
}(this, function (a, b) {
  "use strict";

  function c(a, b, c) {
    if (k.DEBUG) {
      var d = c ? " on the " + c + " channel" : "";
      console && console.warn && console.warn(a + d + ': "' + b + '"')
    }
  }

  function d(a, b, c, d) {
    if (!c) return !1;
    var e = [];
    if ("object" == typeof c) {
      for (var f in c) e.push(a[b].apply(a, [f, c[f]].concat(d)));
      return e
    }
    if (l.test(c)) {
      for (var g = c.split(l), h = 0, i = g.length; i > h; h++) e.push(a[b].apply(a, [g[h]].concat(d)));
      return e
    }
    return !1
  }

  function e(a, b, c) {
    var d = c[0],
      e = c[1],
      f = c[2];
    switch (c.length) {
    case 0:
      return a.call(b);
    case 1:
      return a.call(b, d);
    case 2:
      return a.call(b, d, e);
    case 3:
      return a.call(b, d, e, f);
    default:
      return a.apply(b, c)
    }
  }

  function f(a, b, c, d) {
    var e = a[b];
    return c && c !== e.callback && c !== e.callback._callback || d && d !== e.context ? void 0 : (delete a[b], !0)
  }

  function g(a, c, d, e) {
    a || (a = {});
    for (var g = c ? [c] : b.keys(a), h = !1, i = 0, j = g.length; j > i; i++) c = g[i], a[c] && f(a, c, d, e) && (h = !0);
    return h
  }

  function h(a) {
    return m[a] || (m[a] = b.partial(k.log, a))
  }

  function i(a) {
    return b.isFunction(a) ? a : function () {
      return a
    }
  }
  var j = a.Radio,
    k = a.Radio = {};
  k.VERSION = "0.8.4", k.noConflict = function () {
    return a.Radio = j, this
  }, k.DEBUG = !1;
  var l = /\s+/,
    m = {};
  b.extend(k, {
    log: function (a, c) {
      var d = b.rest(arguments, 2);
      console.log("[" + a + '] "' + c + '"', d)
    },
    tuneIn: function (a) {
      var b = k.channel(a);
      return b._tunedIn = !0, b.on("all", h(a)), this
    },
    tuneOut: function (a) {
      var b = k.channel(a);
      return b._tunedIn = !1, b.off("all", h(a)), delete m[a], this
    }
  }), k.Commands = {
    command: function (a) {
      var f = b.rest(arguments);
      if (d(this, "command", a, f)) return this;
      var g = this.channelName,
        h = this._commands;
      if (g && this._tunedIn && k.log.apply(this, [g, a].concat(f)), h && (h[a] || h["default"])) {
        var i = h[a] || h["default"];
        f = h[a] ? f : arguments, e(i.callback, i.context, f)
      } else c("An unhandled command was fired", a, g);
      return this
    },
    comply: function (a, b, e) {
      return d(this, "comply", a, [b, e]) ? this : (this._commands || (this._commands = {}), this._commands[a] && c("A command was overwritten", a, this.channelName), this._commands[a] = {
        callback: b,
        context: e || this
      }, this)
    },
    complyOnce: function (a, c, e) {
      if (d(this, "complyOnce", a, [c, e])) return this;
      var f = this,
        g = b.once(function () {
          return f.stopComplying(a), c.apply(this, arguments)
        });
      return this.comply(a, g, e)
    },
    stopComplying: function (a, b, e) {
      return d(this, "stopComplying", a) ? this : (a || b || e ? g(this._commands, a, b, e) || c("Attempted to remove the unregistered command", a, this.channelName) : delete this._commands, this)
    }
  }, k.Requests = {
    request: function (a) {
      var f = b.rest(arguments),
        g = d(this, "request", a, f);
      if (g) return g;
      var h = this.channelName,
        i = this._requests;
      if (h && this._tunedIn && k.log.apply(this, [h, a].concat(f)), i && (i[a] || i["default"])) {
        var j = i[a] || i["default"];
        return f = i[a] ? f : arguments, e(j.callback, j.context, f)
      }
      c("An unhandled request was fired", a, h)
    },
    reply: function (a, b, e) {
      return d(this, "reply", a, [b, e]) ? this : (this._requests || (this._requests = {}), this._requests[a] && c("A request was overwritten", a, this.channelName), this._requests[a] = {
        callback: i(b),
        context: e || this
      }, this)
    },
    replyOnce: function (a, c, e) {
      if (d(this, "replyOnce", a, [c, e])) return this;
      var f = this,
        g = b.once(function () {
          return f.stopReplying(a), i(c).apply(this, arguments)
        });
      return this.reply(a, g, e)
    },
    stopReplying: function (a, b, e) {
      return d(this, "stopReplying", a) ? this : (a || b || e ? g(this._requests, a, b, e) || c("Attempted to remove the unregistered request", a, this.channelName) : delete this._requests, this)
    }
  }, k._channels = {}, k.channel = function (a) {
    if (!a) throw new Error("You must provide a name for the channel.");
    return k._channels[a] ? k._channels[a] : k._channels[a] = new k.Channel(a)
  }, k.Channel = function (a) {
    this.channelName = a
  }, b.extend(k.Channel.prototype, a.Events, k.Commands, k.Requests, {
    reset: function () {
      return this.off(), this.stopListening(), this.stopComplying(), this.stopReplying(), this
    }
  });
  var n, o, p = [a.Events, k.Commands, k.Requests];
  return b.each(p, function (a) {
    b.each(a, function (a, c) {
      k[c] = function (a) {
        return o = b.rest(arguments), n = this.channel(a), n[c].apply(n, o)
      }
    })
  }), k
});
//# sourceMappingURL=backbone.radio.min.js.map