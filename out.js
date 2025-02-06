(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __glob = (map) => (path) => {
    var fn = map[path];
    if (fn) return fn();
    throw new Error("Module not found in bundle: " + path);
  };
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name2 in all)
      __defProp(target, name2, { get: all[name2], enumerable: true });
  };

  // layx/others/syntax_highlighter/languages/asm.js
  var asm_exports = {};
  __export(asm_exports, {
    default: () => asm_default
  });
  var asm_default;
  var init_asm = __esm({
    "layx/others/syntax_highlighter/languages/asm.js"() {
      asm_default = [
        {
          type: "cmnt",
          match: /(;|#).*/gm
        },
        {
          expand: "str"
        },
        {
          expand: "num"
        },
        {
          // value (ex: "$0x1")
          type: "num",
          match: /\$[\da-fA-F]*\b/g
        },
        {
          type: "kwd",
          // ex: "section .data"
          match: /^[a-z]+\s+[a-z.]+\b/gm,
          sub: [
            {
              // keyword (ex: "section")
              type: "func",
              match: /^[a-z]+/g
            }
          ]
        },
        {
          // instruction (ex: "mov")
          type: "kwd",
          match: /^\t*[a-z][a-z\d]*\b/gm
        },
        {
          match: /%|\$/g,
          type: "oper"
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/bash.js
  var bash_exports = {};
  __export(bash_exports, {
    default: () => bash_default
  });
  var variable, bash_default;
  var init_bash = __esm({
    "layx/others/syntax_highlighter/languages/bash.js"() {
      variable = {
        type: "var",
        match: /\$\w+|\${[^}]*}|\$\([^)]*\)/g
      };
      bash_default = [
        {
          sub: "todo",
          match: /#.*/g
        },
        {
          type: "str",
          match: /(["'])((?!\1)[^\r\n\\]|\\[^])*\1?/g,
          sub: [variable]
        },
        {
          // relative or absolute path
          type: "oper",
          match: /(?<=\s|^)\.*\/[a-z/_.-]+/gi
        },
        {
          type: "kwd",
          match: /\s-[a-zA-Z]+|$<|[&|;]+|\b(unset|readonly|shift|export|if|fi|else|elif|while|do|done|for|until|case|esac|break|continue|exit|return|trap|wait|eval|exec|then|declare|enable|local|select|typeset|time|add|remove|install|update|delete)(?=\s|$)/g
        },
        {
          expand: "num"
        },
        {
          // command
          type: "func",
          match: /(?<=(^|\||\&\&|\;)\s*)[a-z_.-]+(?=\s|$)/gmi
        },
        {
          type: "bool",
          match: /(?<=\s|^)(true|false)(?=\s|$)/g
        },
        // {
        // 	// function definition
        // 	type: 'func',
        // 	match: /(?<=\s|^)[a-z_]+(?=\s*\()/g
        // },
        {
          type: "oper",
          match: /[=(){}<>!]+/g
        },
        {
          type: "var",
          match: /(?<=\s|^)[\w_]+(?=\s*=)/g
        },
        variable
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/bf.js
  var bf_exports = {};
  __export(bf_exports, {
    default: () => bf_default
  });
  var bf_default;
  var init_bf = __esm({
    "layx/others/syntax_highlighter/languages/bf.js"() {
      bf_default = [
        {
          match: /[^\[\->+.<\]\s].*/g,
          sub: "todo"
        },
        {
          type: "func",
          match: /\.+/g
        },
        {
          type: "kwd",
          match: /[<>]+/g
        },
        {
          type: "oper",
          match: /[+-]+/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/c.js
  var c_exports = {};
  __export(c_exports, {
    default: () => c_default
  });
  var c_default;
  var init_c = __esm({
    "layx/others/syntax_highlighter/languages/c.js"() {
      c_default = [
        {
          match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
          sub: "todo"
        },
        {
          expand: "str"
        },
        {
          expand: "num"
        },
        {
          type: "kwd",
          match: /#\s*include (<.*>|".*")/g,
          sub: [
            {
              type: "str",
              match: /(<|").*/g
            }
          ]
        },
        {
          match: /asm\s*{[^}]*}/g,
          sub: [
            {
              type: "kwd",
              match: /^asm/g
            },
            {
              //type: 'str',
              match: /[^{}]*(?=}$)/g,
              sub: "asm"
            }
          ]
        },
        {
          type: "kwd",
          match: /\*|&|#[a-z]+\b|\b(asm|auto|double|int|struct|break|else|long|switch|case|enum|register|typedef|char|extern|return|union|const|float|short|unsigned|continue|for|signed|void|default|goto|sizeof|volatile|do|if|static|while)\b/g
        },
        {
          type: "oper",
          match: /[/*+:?&|%^~=!,<>.^-]+/g
        },
        {
          type: "func",
          match: /[a-zA-Z_][\w_]*(?=\s*\()/g
        },
        {
          type: "class",
          match: /\b[A-Z][\w_]*\b/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/css.js
  var css_exports = {};
  __export(css_exports, {
    default: () => css_default
  });
  var css_default;
  var init_css = __esm({
    "layx/others/syntax_highlighter/languages/css.js"() {
      css_default = [
        {
          match: /\/\*((?!\*\/)[^])*(\*\/)?/g,
          sub: "todo"
        },
        {
          expand: "str"
        },
        {
          type: "kwd",
          match: /@\w+\b|\b(and|not|only|or)\b|\b[a-z-]+(?=[^{}]*{)/g
        },
        {
          type: "var",
          match: /\b[\w-]+(?=\s*:)|(::?|\.)[\w-]+(?=[^{}]*{)/g
        },
        {
          type: "func",
          match: /#[\w-]+(?=[^{}]*{)/g
        },
        {
          type: "num",
          match: /#[\da-f]{3,8}/g
        },
        {
          type: "num",
          match: /\d+(\.\d+)?(cm|mm|in|px|pt|pc|em|ex|ch|rem|vm|vh|vmin|vmax|%)?/g,
          sub: [
            {
              type: "var",
              match: /[a-z]+|%/g
            }
          ]
        },
        {
          match: /url\([^)]*\)/g,
          sub: [
            {
              type: "func",
              match: /url(?=\()/g
            },
            {
              type: "str",
              match: /[^()]+/g
            }
          ]
        },
        {
          type: "func",
          match: /\b[a-zA-Z]\w*(?=\s*\()/g
        },
        {
          type: "num",
          match: /\b[a-z-]+\b/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/csv.js
  var csv_exports = {};
  __export(csv_exports, {
    default: () => csv_default
  });
  var csv_default;
  var init_csv = __esm({
    "layx/others/syntax_highlighter/languages/csv.js"() {
      csv_default = [
        {
          expand: "strDouble"
        },
        {
          type: "oper",
          match: /,/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/diff.js
  var diff_exports = {};
  __export(diff_exports, {
    default: () => diff_default
  });
  var diff_default;
  var init_diff = __esm({
    "layx/others/syntax_highlighter/languages/diff.js"() {
      diff_default = [
        {
          type: "deleted",
          match: /^[-<].*/gm
        },
        {
          type: "insert",
          match: /^[+>].*/gm
        },
        {
          type: "kwd",
          match: /!.*/gm
        },
        {
          type: "section",
          match: /^@@.*@@$|^\d.*|^([*-+])\1\1.*/gm
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/docker.js
  var docker_exports = {};
  __export(docker_exports, {
    default: () => docker_default
  });
  var docker_default;
  var init_docker = __esm({
    "layx/others/syntax_highlighter/languages/docker.js"() {
      init_bash();
      docker_default = [
        {
          type: "kwd",
          match: /^(FROM|RUN|CMD|LABEL|MAINTAINER|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL)\b/gmi
        },
        ...bash_default
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/git.js
  var git_exports = {};
  __export(git_exports, {
    default: () => git_default
  });
  var git_default;
  var init_git = __esm({
    "layx/others/syntax_highlighter/languages/git.js"() {
      init_diff();
      git_default = [
        {
          match: /^#.*/gm,
          sub: "todo"
        },
        {
          expand: "str"
        },
        ...diff_default,
        {
          type: "func",
          match: /^(\$ )?git(\s.*)?$/gm
        },
        {
          type: "kwd",
          match: /^commit \w+$/gm
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/go.js
  var go_exports = {};
  __export(go_exports, {
    default: () => go_default
  });
  var go_default;
  var init_go = __esm({
    "layx/others/syntax_highlighter/languages/go.js"() {
      go_default = [
        {
          match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
          sub: "todo"
        },
        {
          expand: "str"
        },
        {
          expand: "num"
        },
        {
          type: "kwd",
          match: /\*|&|\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go|goto|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g
        },
        {
          type: "func",
          match: /[a-zA-Z_][\w_]*(?=\s*\()/g
        },
        {
          type: "class",
          match: /\b[A-Z][\w_]*\b/g
        },
        {
          type: "oper",
          match: /[+\-*\/%&|^~=!<>.^-]+/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/xml.js
  var xml_exports = {};
  __export(xml_exports, {
    default: () => xml_default,
    name: () => name,
    properties: () => properties,
    xmlElement: () => xmlElement
  });
  var nameStartChar, nameChar, name, properties, xmlElement, xml_default;
  var init_xml = __esm({
    "layx/others/syntax_highlighter/languages/xml.js"() {
      nameStartChar = ":A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD";
      nameChar = nameStartChar + "\\-\\.0-9\xB7\u0300-\u036F\u203F-\u2040";
      name = `[${nameStartChar}][${nameChar}]*`;
      properties = `\\s*(\\s+${name}\\s*(=\\s*([^"']\\S*|("|')(\\\\[^]|(?!\\4)[^])*\\4?)?)?\\s*)*`;
      xmlElement = {
        match: RegExp(`<[/!?]?${name}${properties}[/!?]?>`, "g"),
        sub: [
          {
            type: "var",
            match: RegExp(`^<[/!?]?${name}`, "g"),
            sub: [
              {
                type: "oper",
                match: /^<[\/!?]?/g
              }
            ]
          },
          {
            type: "str",
            match: /=\s*([^"']\S*|("|')(\\[^]|(?!\2)[^])*\2?)/g,
            sub: [
              {
                type: "oper",
                match: /^=/g
              }
            ]
          },
          {
            type: "oper",
            match: /[\/!?]?>/g
          },
          {
            type: "class",
            match: RegExp(name, "g")
          }
        ]
      };
      xml_default = [
        {
          match: /<!--((?!-->)[^])*-->/g,
          sub: "todo"
        },
        {
          type: "class",
          match: /<!\[CDATA\[[\s\S]*?\]\]>/gi
        },
        xmlElement,
        // https://github.com/speed-highlight/core/issues/49
        {
          type: "str",
          match: RegExp(`<\\?${name}([^?]|\\?[^?>])*\\?+>`, "g"),
          sub: [
            {
              type: "var",
              match: RegExp(`^<\\?${name}`, "g"),
              sub: [
                {
                  type: "oper",
                  match: /^<\?/g
                }
              ]
            },
            {
              type: "oper",
              match: /\?+>$/g
            }
          ]
        },
        {
          type: "var",
          match: /&(#x?)?[\da-z]{1,8};/gi
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/html.js
  var html_exports = {};
  __export(html_exports, {
    default: () => html_default
  });
  var html_default;
  var init_html = __esm({
    "layx/others/syntax_highlighter/languages/html.js"() {
      init_xml();
      html_default = [
        {
          type: "class",
          match: /<!DOCTYPE("[^"]*"|'[^']*'|[^"'>])*>/gi,
          sub: [
            {
              type: "str",
              match: /"[^"]*"|'[^']*'/g
            },
            {
              type: "oper",
              match: /^<!|>$/g
            },
            {
              type: "var",
              match: /DOCTYPE/gi
            }
          ]
        },
        {
          match: RegExp(`<style${properties}>((?!</style>)[^])*</style\\s*>`, "g"),
          sub: [
            {
              match: RegExp(`^<style${properties}>`, "g"),
              sub: xmlElement.sub
            },
            {
              match: RegExp(`${xmlElement.match}|[^]*(?=</style\\s*>$)`, "g"),
              sub: "css"
            },
            xmlElement
          ]
        },
        {
          match: RegExp(`<script${properties}>((?!<\/script>)[^])*<\/script\\s*>`, "g"),
          sub: [
            {
              match: RegExp(`^<script${properties}>`, "g"),
              sub: xmlElement.sub
            },
            {
              match: RegExp(`${xmlElement.match}|[^]*(?=<\/script\\s*>$)`, "g"),
              sub: "js"
            },
            xmlElement
          ]
        },
        ...xml_default
      ];
    }
  });

  // layx/others/syntax_highlighter/detect.js
  var languages, detectLanguage;
  var init_detect = __esm({
    "layx/others/syntax_highlighter/detect.js"() {
      languages = [
        ["bash", [/#!(\/usr)?\/bin\/bash/g, 500], [/\b(if|elif|then|fi|echo)\b|\$/g, 10]],
        ["html", [/<\/?[a-z-]+[^\n>]*>/g, 10], [/^\s+<!DOCTYPE\s+html/g, 500]],
        ["http", [/^(GET|HEAD|POST|PUT|DELETE|PATCH|HTTP)\b/g, 500]],
        ["js", [/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require)\b/g, 10]],
        ["ts", [/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require|implements|interface|namespace)\b/g, 10]],
        ["py", [/\b(def|print|class|and|or|lambda)\b/g, 10]],
        ["sql", [/\b(SELECT|INSERT|FROM)\b/g, 50]],
        ["pl", [/#!(\/usr)?\/bin\/perl/g, 500], [/\b(use|print)\b|\$/g, 10]],
        ["lua", [/#!(\/usr)?\/bin\/lua/g, 500]],
        ["make", [/\b(ifneq|endif|if|elif|then|fi|echo|.PHONY|^[a-z]+ ?:$)\b|\$/gm, 10]],
        ["uri", [/https?:|mailto:|tel:|ftp:/g, 30]],
        ["css", [/^(@import|@page|@media|(\.|#)[a-z]+)/gm, 20]],
        ["diff", [/^[+><-]/gm, 10], [/^@@ ?[-+,0-9 ]+ ?@@/gm, 25]],
        ["md", [/^(>|\t\*|\t\d+.)/gm, 10], [/\[.*\](.*)/g, 10]],
        ["docker", [/^(FROM|ENTRYPOINT|RUN)/gm, 500]],
        ["xml", [/<\/?[a-z-]+[^\n>]*>/g, 10], [/^<\?xml/g, 500]],
        ["c", [/#include\b|\bprintf\s+\(/g, 100]],
        ["rs", [/^\s+(use|fn|mut|match)\b/gm, 100]],
        ["go", [/\b(func|fmt|package)\b/g, 100]],
        ["java", [/^import\s+java/gm, 500]],
        ["asm", [/^(section|global main|extern|\t(call|mov|ret))/gm, 100]],
        ["css", [/^(@import|@page|@media|(\.|#)[a-z]+)/gm, 20]],
        ["json", [/\b(true|false|null|\{})\b|\"[^"]+\":/g, 10]],
        ["yaml", [/^(\s+)?[a-z][a-z0-9]*:/gmi, 10]]
      ];
      detectLanguage = (code) => {
        return languages.map(([lang, ...features]) => [
          lang,
          features.reduce((acc, [match, score]) => acc + [...code.matchAll(match)].length * score, 0)
        ]).filter(([lang, score]) => score > 20).sort((a, b) => b[1] - a[1])[0]?.[0] || "plain";
      };
    }
  });

  // layx/others/syntax_highlighter/languages/http.js
  var http_exports = {};
  __export(http_exports, {
    default: () => http_default
  });
  var http_default;
  var init_http = __esm({
    "layx/others/syntax_highlighter/languages/http.js"() {
      init_detect();
      http_default = [
        {
          type: "kwd",
          match: /^(GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\b/gm
        },
        {
          expand: "str"
        },
        {
          type: "section",
          match: /\bHTTP\/[\d.]+\b/g
        },
        {
          expand: "num"
        },
        {
          type: "oper",
          match: /[,;:=]/g
        },
        {
          type: "var",
          match: /[a-zA-Z][\w-]*(?=:)/g
        },
        {
          match: /\n\n[^]*/g,
          sub: detectLanguage
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/ini.js
  var ini_exports = {};
  __export(ini_exports, {
    default: () => ini_default
  });
  var ini_default;
  var init_ini = __esm({
    "layx/others/syntax_highlighter/languages/ini.js"() {
      ini_default = [
        {
          match: /(^[ \f\t\v]*)[#;].*/gm,
          sub: "todo"
        },
        {
          type: "str",
          match: /.*/g
        },
        {
          type: "var",
          match: /.*(?==)/g
        },
        {
          type: "section",
          match: /^\s*\[.+\]\s*$/gm
        },
        {
          type: "oper",
          match: /=/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/java.js
  var java_exports = {};
  __export(java_exports, {
    default: () => java_default
  });
  var java_default;
  var init_java = __esm({
    "layx/others/syntax_highlighter/languages/java.js"() {
      java_default = [
        {
          match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
          sub: "todo"
        },
        {
          expand: "str"
        },
        {
          expand: "num"
        },
        {
          type: "kwd",
          match: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|continue|const|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|package|private|protected|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|var|void|volatile|while)\b/g
        },
        {
          type: "oper",
          match: /[/*+:?&|%^~=!,<>.^-]+/g
        },
        {
          type: "func",
          match: /[a-zA-Z_][\w_]*(?=\s*\()/g
        },
        {
          type: "class",
          match: /\b[A-Z][\w_]*\b/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/js.js
  var js_exports = {};
  __export(js_exports, {
    default: () => js_default
  });
  var js_default;
  var init_js = __esm({
    "layx/others/syntax_highlighter/languages/js.js"() {
      js_default = [
        {
          match: /\/\*\*((?!\*\/)[^])*(\*\/)?/g,
          sub: "jsdoc"
        },
        {
          match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
          sub: "todo"
        },
        {
          expand: "str"
        },
        {
          match: /`((?!`)[^]|\\[^])*`?/g,
          sub: "js_template_literals"
        },
        {
          type: "kwd",
          match: /=>|\b(this|set|get|as|async|await|break|case|catch|class|const|constructor|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|if|implements|import|in|instanceof|interface|let|var|of|new|package|private|protected|public|return|static|super|switch|throw|throws|try|typeof|void|while|with|yield)\b/g
        },
        {
          match: /\/((?!\/)[^\r\n\\]|\\.)+\/[dgimsuy]*/g,
          sub: "regex"
        },
        {
          expand: "num"
        },
        {
          type: "num",
          match: /\b(NaN|null|undefined|[A-Z][A-Z_]*)\b/g
        },
        {
          type: "bool",
          match: /\b(true|false)\b/g
        },
        {
          type: "oper",
          match: /[/*+:?&|%^~=!,<>.^-]+/g
        },
        {
          type: "class",
          match: /\b[A-Z][\w_]*\b/g
        },
        {
          type: "func",
          match: /[a-zA-Z$_][\w$_]*(?=\s*((\?\.)?\s*\(|=\s*(\(?[\w,{}\[\])]+\)? =>|function\b)))/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/js_template_literals.js
  var js_template_literals_exports = {};
  __export(js_template_literals_exports, {
    default: () => js_template_literals_default,
    type: () => type
  });
  var js_template_literals_default, type;
  var init_js_template_literals = __esm({
    "layx/others/syntax_highlighter/languages/js_template_literals.js"() {
      js_template_literals_default = [
        {
          match: new class {
            exec(str) {
              let i = this.lastIndex, j, f = (_) => {
                while (++i < str.length - 2)
                  if (str[i] == "{") f();
                  else if (str[i] == "}") return;
              };
              for (; i < str.length; ++i)
                if (str[i - 1] != "\\" && str[i] == "$" && str[i + 1] == "{") {
                  j = i++;
                  f(i);
                  this.lastIndex = i + 1;
                  return { index: j, 0: str.slice(j, i + 1) };
                }
              return null;
            }
          }(),
          sub: [
            {
              type: "kwd",
              match: /^\${|}$/g
            },
            {
              match: /(?!^\$|{)[^]+(?=}$)/g,
              sub: "js"
            }
          ]
        }
      ];
      type = "str";
    }
  });

  // layx/others/syntax_highlighter/languages/todo.js
  var todo_exports = {};
  __export(todo_exports, {
    default: () => todo_default,
    type: () => type2
  });
  var todo_default, type2;
  var init_todo = __esm({
    "layx/others/syntax_highlighter/languages/todo.js"() {
      todo_default = [
        {
          type: "err",
          match: /\b(TODO|FIXME|DEBUG|OPTIMIZE|WARNING|XXX|BUG)\b/g
        },
        {
          type: "class",
          match: /\bIDEA\b/g
        },
        {
          type: "insert",
          match: /\b(CHANGED|FIX|CHANGE)\b/g
        },
        {
          type: "oper",
          match: /\bQUESTION\b/g
        }
      ];
      type2 = "cmnt";
    }
  });

  // layx/others/syntax_highlighter/languages/jsdoc.js
  var jsdoc_exports = {};
  __export(jsdoc_exports, {
    default: () => jsdoc_default,
    type: () => type3
  });
  var jsdoc_default, type3;
  var init_jsdoc = __esm({
    "layx/others/syntax_highlighter/languages/jsdoc.js"() {
      init_todo();
      jsdoc_default = [
        {
          type: "kwd",
          match: /@\w+/g
        },
        {
          type: "class",
          match: /{[\w\s|<>,.@\[\]]+}/g
        },
        {
          type: "var",
          match: /\[[\w\s="']+\]/g
        },
        ...todo_default
      ];
      type3 = "cmnt";
    }
  });

  // layx/others/syntax_highlighter/languages/json.js
  var json_exports = {};
  __export(json_exports, {
    default: () => json_default
  });
  var json_default;
  var init_json = __esm({
    "layx/others/syntax_highlighter/languages/json.js"() {
      json_default = [
        {
          type: "var",
          match: /("|')?[a-zA-Z]\w*\1(?=\s*:)/g
        },
        {
          expand: "str"
        },
        {
          expand: "num"
        },
        {
          type: "num",
          match: /\bnull\b/g
        },
        {
          type: "bool",
          match: /\b(true|false)\b/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/md.js
  var md_exports = {};
  __export(md_exports, {
    default: () => md_default
  });
  var md_default;
  var init_md = __esm({
    "layx/others/syntax_highlighter/languages/md.js"() {
      init_detect();
      md_default = [
        {
          type: "cmnt",
          match: /^>.*|(=|-)\1+/gm
        },
        {
          type: "class",
          match: /\*\*((?!\*\*).)*\*\*/g
        },
        {
          match: /```((?!```)[^])*\n```/g,
          sub: (code) => ({
            type: "kwd",
            sub: [
              {
                match: /\n[^]*(?=```)/g,
                sub: code.split("\n")[0].slice(3) || detectLanguage(code)
              }
            ]
          })
        },
        {
          type: "str",
          match: /`[^`]*`/g
        },
        {
          type: "var",
          match: /~~((?!~~).)*~~/g
        },
        {
          type: "kwd",
          match: /_[^_]*_|\*[^*]*\*/g
        },
        {
          type: "kwd",
          match: /^\s*(\*|\d+\.)\s/gm
        },
        {
          type: "oper",
          match: /\[[^\]]*]/g
        },
        {
          type: "func",
          match: /\([^)]*\)/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/leanpub-md.js
  var leanpub_md_exports = {};
  __export(leanpub_md_exports, {
    default: () => leanpub_md_default
  });
  var leanpub_md_default;
  var init_leanpub_md = __esm({
    "layx/others/syntax_highlighter/languages/leanpub-md.js"() {
      init_md();
      init_detect();
      leanpub_md_default = [
        {
          type: "insert",
          match: /(leanpub-start-insert)((?!leanpub-end-insert)[^])*(leanpub-end-insert)?/g,
          sub: [
            {
              type: "insert",
              match: /leanpub-(start|end)-insert/g
            },
            {
              match: /(?!leanpub-start-insert)((?!leanpub-end-insert)[^])*/g,
              sub: detectLanguage
            }
          ]
        },
        {
          type: "deleted",
          match: /(leanpub-start-delete)((?!leanpub-end-delete)[^])*(leanpub-end-delete)?/g,
          sub: [
            {
              type: "deleted",
              match: /leanpub-(start|end)-delete/g
            },
            {
              match: /(?!leanpub-start-delete)((?!leanpub-end-delete)[^])*/g,
              sub: detectLanguage
            }
          ]
        },
        ...md_default
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/log.js
  var log_exports = {};
  __export(log_exports, {
    default: () => log_default
  });
  var log_default;
  var init_log = __esm({
    "layx/others/syntax_highlighter/languages/log.js"() {
      log_default = [
        {
          type: "cmnt",
          match: /^#.*/gm
        },
        {
          expand: "strDouble"
        },
        {
          expand: "num"
        },
        {
          type: "err",
          match: /\b(err(or)?|[a-z_-]*exception|warn|warning|failed|ko|invalid|not ?found|alert|fatal)\b/gi
        },
        {
          type: "num",
          match: /\b(null|undefined)\b/gi
        },
        {
          type: "bool",
          match: /\b(false|true|yes|no)\b/gi
        },
        {
          type: "oper",
          match: /\.|,/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/lua.js
  var lua_exports = {};
  __export(lua_exports, {
    default: () => lua_default
  });
  var lua_default;
  var init_lua = __esm({
    "layx/others/syntax_highlighter/languages/lua.js"() {
      lua_default = [
        {
          match: /^#!.*|--(\[(=*)\[((?!--\]\2\])[^])*--\]\2\]|.*)/g,
          sub: "todo"
        },
        {
          expand: "str"
        },
        {
          type: "kwd",
          match: /\b(and|break|do|else|elseif|end|for|function|if|in|local|not|or|repeat|return|then|until|while)\b/g
        },
        {
          type: "bool",
          match: /\b(true|false|nil)\b/g
        },
        {
          type: "oper",
          match: /[+*/%^#=~<>:,.-]+/g
        },
        {
          expand: "num"
        },
        {
          type: "func",
          match: /[a-z_]+(?=\s*[({])/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/make.js
  var make_exports = {};
  __export(make_exports, {
    default: () => make_default
  });
  var make_default;
  var init_make = __esm({
    "layx/others/syntax_highlighter/languages/make.js"() {
      make_default = [
        {
          match: /^\s*#.*/gm,
          sub: "todo"
        },
        {
          expand: "str"
        },
        {
          type: "oper",
          match: /[${}()]+/g
        },
        {
          type: "class",
          match: /.PHONY:/gm
        },
        {
          type: "section",
          match: /^[\w.]+:/gm
        },
        {
          type: "kwd",
          match: /\b(ifneq|endif)\b/g
        },
        {
          expand: "num"
        },
        {
          type: "var",
          match: /[A-Z_]+(?=\s*=)/g
        },
        {
          match: /^.*$/gm,
          sub: "bash"
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/pl.js
  var pl_exports = {};
  __export(pl_exports, {
    default: () => pl_default
  });
  var pl_default;
  var init_pl = __esm({
    "layx/others/syntax_highlighter/languages/pl.js"() {
      pl_default = [
        {
          match: /#.*/g,
          sub: "todo"
        },
        {
          type: "str",
          match: /(["'])(\\[^]|(?!\1)[^])*\1?/g
        },
        {
          expand: "num"
        },
        {
          type: "kwd",
          match: /\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while|not|and|or|xor)\b/g
        },
        {
          type: "oper",
          match: /[-+*/%~!&<>|=?,]+/g
        },
        {
          type: "func",
          match: /[a-z_]+(?=\s*\()/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/plain.js
  var plain_exports = {};
  __export(plain_exports, {
    default: () => plain_default
  });
  var plain_default;
  var init_plain = __esm({
    "layx/others/syntax_highlighter/languages/plain.js"() {
      plain_default = [
        {
          expand: "strDouble"
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/py.js
  var py_exports = {};
  __export(py_exports, {
    default: () => py_default
  });
  var py_default;
  var init_py = __esm({
    "layx/others/syntax_highlighter/languages/py.js"() {
      py_default = [
        {
          match: /#.*/g,
          sub: "todo"
        },
        {
          match: /("""|''')(\\[^]|(?!\1)[^])*\1?/g,
          sub: "todo"
        },
        {
          type: "str",
          match: /f("|')(\\[^]|(?!\1).)*\1?|f((["'])\4\4)(\\[^]|(?!\3)[^])*\3?/gi,
          sub: [
            {
              type: "var",
              match: /{[^{}]*}/g,
              sub: [
                {
                  match: /(?!^{)[^]*(?=}$)/g,
                  sub: "py"
                }
              ]
            }
          ]
        },
        {
          expand: "str"
        },
        {
          type: "kwd",
          match: /\b(and|as|assert|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g
        },
        {
          type: "bool",
          match: /\b(False|True|None)\b/g
        },
        {
          expand: "num"
        },
        {
          type: "func",
          match: /[a-z_]+(?=\s*\()/g
        },
        {
          type: "oper",
          match: /[-/*+<>,=!&|^%]+/g
        },
        {
          type: "class",
          match: /\b[A-Z][\w_]*\b/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/regex.js
  var regex_exports = {};
  __export(regex_exports, {
    default: () => regex_default,
    type: () => type4
  });
  var regex_default, type4;
  var init_regex = __esm({
    "layx/others/syntax_highlighter/languages/regex.js"() {
      regex_default = [
        {
          match: /^(?!\/).*/gm,
          sub: "todo"
        },
        {
          type: "num",
          match: /\[((?!\])[^\\]|\\.)*\]/g
        },
        {
          type: "kwd",
          match: /\||\^|\$|\\.|\w+($|\r|\n)/g
        },
        {
          type: "var",
          match: /\*|\+|\{\d+,\d+\}/g
        }
      ];
      type4 = "oper";
    }
  });

  // layx/others/syntax_highlighter/languages/rs.js
  var rs_exports = {};
  __export(rs_exports, {
    default: () => rs_default
  });
  var rs_default;
  var init_rs = __esm({
    "layx/others/syntax_highlighter/languages/rs.js"() {
      rs_default = [
        {
          match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
          sub: "todo"
        },
        {
          expand: "str"
        },
        {
          expand: "num"
        },
        {
          type: "kwd",
          match: /\b(as|break|const|continue|crate|else|enum|extern|false|fn|for|if|impl|in|let|loop|match|mod|move|mut|pub|ref|return|self|Self|static|struct|super|trait|true|type|unsafe|use|where|while|async|await|dyn|abstract|become|box|do|final|macro|override|priv|typeof|unsized|virtual|yield|try)\b/g
        },
        {
          type: "oper",
          match: /[/*+:?&|%^~=!,<>.^-]+/g
        },
        {
          type: "class",
          match: /\b[A-Z][\w_]*\b/g
        },
        {
          type: "func",
          match: /[a-zA-Z_][\w_]*(?=\s*!?\s*\()/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/sql.js
  var sql_exports = {};
  __export(sql_exports, {
    default: () => sql_default
  });
  var sql_default;
  var init_sql = __esm({
    "layx/others/syntax_highlighter/languages/sql.js"() {
      sql_default = [
        {
          match: /--.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
          sub: "todo"
        },
        {
          expand: "str"
        },
        {
          type: "func",
          match: /\b(AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/g
        },
        {
          type: "kwd",
          match: /\b(ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|kwdS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/g
        },
        {
          type: "num",
          match: /\.?\d[\d.oxa-fA-F-]*|\bNULL\b/g
        },
        {
          type: "bool",
          match: /\b(TRUE|FALSE)\b/g
        },
        {
          type: "oper",
          match: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|IN|ILIKE|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/g
        },
        {
          type: "var",
          match: /@\S+/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/toml.js
  var toml_exports = {};
  __export(toml_exports, {
    default: () => toml_default
  });
  var toml_default;
  var init_toml = __esm({
    "layx/others/syntax_highlighter/languages/toml.js"() {
      toml_default = [
        {
          match: /#.*/g,
          sub: "todo"
        },
        {
          type: "str",
          match: /("""|''')((?!\1)[^]|\\[^])*\1?/g
        },
        {
          expand: "str"
        },
        {
          type: "section",
          match: /^\[.+\]\s*$/gm
        },
        {
          type: "num",
          match: /\b(inf|nan)\b|\d[\d:ZT.-]*/g
        },
        {
          expand: "num"
        },
        {
          type: "bool",
          match: /\b(true|false)\b/g
        },
        {
          type: "oper",
          match: /[+,.=-]/g
        },
        {
          type: "var",
          match: /\w+(?= \=)/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/ts.js
  var ts_exports = {};
  __export(ts_exports, {
    default: () => ts_default
  });
  var ts_default;
  var init_ts = __esm({
    "layx/others/syntax_highlighter/languages/ts.js"() {
      init_js();
      ts_default = [
        {
          type: "type",
          match: /:\s*(any|void|number|boolean|string|object|never|enum)\b/g
        },
        {
          type: "kwd",
          match: /\b(type|namespace|typedef|interface|public|private|protected|implements|declare|abstract|readonly)\b/g
        },
        ...js_default
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/uri.js
  var uri_exports = {};
  __export(uri_exports, {
    default: () => uri_default
  });
  var uri_default;
  var init_uri = __esm({
    "layx/others/syntax_highlighter/languages/uri.js"() {
      uri_default = [
        {
          match: /^#.*/gm,
          sub: "todo"
        },
        {
          type: "class",
          match: /^\w+(?=:?)/gm
        },
        {
          type: "num",
          match: /:\d+/g
        },
        {
          type: "oper",
          match: /[:/&?]|\w+=/g
        },
        {
          type: "func",
          match: /[.\w]+@|#[\w]+$/gm
        },
        {
          type: "var",
          match: /\w+\.\w+(\.\w+)*/g
        }
      ];
    }
  });

  // layx/others/syntax_highlighter/languages/yaml.js
  var yaml_exports = {};
  __export(yaml_exports, {
    default: () => yaml_default
  });
  var yaml_default;
  var init_yaml = __esm({
    "layx/others/syntax_highlighter/languages/yaml.js"() {
      yaml_default = [
        {
          match: /#.*/g,
          sub: "todo"
        },
        {
          expand: "str"
        },
        {
          type: "str",
          match: /(>|\|)\r?\n((\s[^\n]*)?(\r?\n|$))*/g
        },
        {
          type: "type",
          match: /!![a-z]+/g
        },
        {
          type: "bool",
          match: /\b(Yes|No)\b/g
        },
        {
          type: "oper",
          match: /[+:-]/g
        },
        {
          expand: "num"
        },
        {
          type: "var",
          match: /[a-zA-Z]\w*(?=:)/g
        }
      ];
    }
  });

  // layx/others/idb/idb.js
  var IDB = class {
    constructor(dbName, version2 = 1, upgradeCallback) {
      this.dbName = dbName;
      this.version = version2;
      this.upgradeCallback = upgradeCallback;
      this.db = null;
      this.openPromise = null;
    }
    async open() {
      if (this.db) return this.db;
      if (this.openPromise) return this.openPromise;
      this.openPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.version);
        request.onupgradeneeded = (event) => {
          this.db = event.target.result;
          if (this.upgradeCallback) {
            this.upgradeCallback(this.db, event.oldVersion, event.newVersion);
          }
        };
        request.onsuccess = (event) => {
          this.db = event.target.result;
          resolve(this.db);
          this.openPromise = null;
        };
        request.onerror = (event) => {
          reject(new Error(`Error opening database: ${event.target.error.message}`));
          this.openPromise = null;
        };
      });
      return this.openPromise;
    }
    async transaction(storeNames, mode = "readonly") {
      const db = await this.open();
      return db.transaction(storeNames, mode);
    }
    async store(storeName, mode = "readonly") {
      const tx = await this.transaction(storeName, mode);
      return tx.objectStore(storeName);
    }
    async add(storeName, value, key) {
      try {
        const store = await this.store(storeName, "readwrite");
        return await this.request(store.add(value, key));
      } catch (error) {
        throw new Error(`Add operation failed: ${error.message}`);
      }
    }
    async get(storeName, keyOrIndex, key) {
      try {
        const store = await this.store(storeName);
        const request = key !== void 0 ? store.index(keyOrIndex).get(key) : store.get(keyOrIndex);
        return await this.request(request);
      } catch (error) {
        throw new Error(`Get operation failed: ${error.message}`);
      }
    }
    async getAll(storeName, query) {
      try {
        const store = await this.store(storeName);
        const results = [];
        return new Promise((resolve, reject) => {
          const request = query ? store.openCursor(query) : store.openCursor();
          request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
              results.push(cursor.value);
              cursor.continue();
            } else {
              resolve(results);
            }
          };
          request.onerror = (event) => reject(new Error(`GetAll operation failed: ${event.target.error.message}`));
        });
      } catch (error) {
        throw new Error(`GetAll operation failed: ${error.message}`);
      }
    }
    async forEach(storeName, query, callback) {
      try {
        const store = await this.store(storeName);
        return new Promise((resolve, reject) => {
          const request = query ? store.openCursor(query) : store.openCursor();
          request.onsuccess = async (event) => {
            const cursor = event.target.result;
            if (cursor) {
              await callback(cursor.value, cursor);
              cursor.continue();
            } else {
              resolve();
            }
          };
          request.onerror = (event) => reject(new Error(`ForEach operation failed: ${event.target.error.message}`));
        });
      } catch (error) {
        throw new Error(`ForEach operation failed: ${error.message}`);
      }
    }
    async put(storeName, value, key) {
      try {
        const store = await this.store(storeName, "readwrite");
        return await this.request(store.put(value, key));
      } catch (error) {
        throw new Error(`Put operation failed: ${error.message}`);
      }
    }
    async delete(storeName, key) {
      try {
        const store = await this.store(storeName, "readwrite");
        return await this.request(store.delete(key));
      } catch (error) {
        throw new Error(`Delete operation failed: ${error.message}`);
      }
    }
    async clear(storeName) {
      try {
        const store = await this.store(storeName, "readwrite");
        return await this.request(store.clear());
      } catch (error) {
        throw new Error(`Clear operation failed: ${error.message}`);
      }
    }
    close() {
      if (this.db) {
        this.db.close();
        this.db = null;
        this.openPromise = null;
      }
    }
    async deleteDatabase() {
      this.close();
      return new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(this.dbName);
        request.onsuccess = resolve;
        request.onerror = (event) => reject(new Error(`DeleteDatabase operation failed: ${event.target.error.message}`));
      });
    }
    // Utility function for handling indexedDB requests
    request(request) {
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(new Error(event.target.error.message));
      });
    }
  };

  // assets/js/lib/marked.esm.js
  function _getDefaults() {
    return {
      async: false,
      breaks: false,
      extensions: null,
      gfm: true,
      hooks: null,
      pedantic: false,
      renderer: null,
      silent: false,
      tokenizer: null,
      walkTokens: null
    };
  }
  var _defaults = _getDefaults();
  function changeDefaults(newDefaults) {
    _defaults = newDefaults;
  }
  var noopTest = { exec: () => null };
  function edit(regex, opt = "") {
    let source = typeof regex === "string" ? regex : regex.source;
    const obj = {
      replace: (name2, val) => {
        let valSource = typeof val === "string" ? val : val.source;
        valSource = valSource.replace(other.caret, "$1");
        source = source.replace(name2, valSource);
        return obj;
      },
      getRegex: () => {
        return new RegExp(source, opt);
      }
    };
    return obj;
  }
  var other = {
    codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
    outputLinkReplace: /\\([\[\]])/g,
    indentCodeCompensation: /^(\s+)(?:```)/,
    beginningSpace: /^\s+/,
    endingHash: /#$/,
    startingSpaceChar: /^ /,
    endingSpaceChar: / $/,
    nonSpaceChar: /[^ ]/,
    newLineCharGlobal: /\n/g,
    tabCharGlobal: /\t/g,
    multipleSpaceGlobal: /\s+/g,
    blankLine: /^[ \t]*$/,
    doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
    blockquoteStart: /^ {0,3}>/,
    blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
    blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
    listReplaceTabs: /^\t+/,
    listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
    listIsTask: /^\[[ xX]\] /,
    listReplaceTask: /^\[[ xX]\] +/,
    anyLine: /\n.*\n/,
    hrefBrackets: /^<(.*)>$/,
    tableDelimiter: /[:|]/,
    tableAlignChars: /^\||\| *$/g,
    tableRowBlankLine: /\n[ \t]*$/,
    tableAlignRight: /^ *-+: *$/,
    tableAlignCenter: /^ *:-+: *$/,
    tableAlignLeft: /^ *:-+ *$/,
    startATag: /^<a /i,
    endATag: /^<\/a>/i,
    startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
    endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
    startAngleBracket: /^</,
    endAngleBracket: />$/,
    pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
    unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
    escapeTest: /[&<>"']/,
    escapeReplace: /[&<>"']/g,
    escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
    unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
    caret: /(^|[^\[])\^/g,
    percentDecode: /%25/g,
    findPipe: /\|/g,
    splitPipe: / \|/,
    slashPipe: /\\\|/g,
    carriageReturn: /\r\n|\r/g,
    spaceLine: /^ +$/gm,
    notSpaceStart: /^\S*/,
    endingNewline: /\n$/,
    listItemRegex: (bull) => new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`),
    nextBulletRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
    hrRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
    fencesBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`),
    headingBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`),
    htmlBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}<(?:[a-z].*>|!--)`, "i")
  };
  var newline = /^(?:[ \t]*(?:\n|$))+/;
  var blockCode = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
  var fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
  var hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
  var heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
  var bullet = /(?:[*+-]|\d{1,9}[.)])/;
  var lheading = edit(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex();
  var _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
  var blockText = /^[^\n]+/;
  var _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
  var def = edit(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
  var list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
  var _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  var _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
  var html = edit("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  var paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
  var blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
  var blockNormal = {
    blockquote,
    code: blockCode,
    def,
    fences,
    heading,
    hr,
    html,
    lheading,
    list,
    newline,
    paragraph,
    table: noopTest,
    text: blockText
  };
  var gfmTable = edit("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
  var blockGfm = {
    ...blockNormal,
    table: gfmTable,
    paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
  };
  var blockPedantic = {
    ...blockNormal,
    html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: noopTest,
    // fences not supported
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
  };
  var escape$1 = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
  var inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
  var br = /^( {2,}|\\)\n(?!\s*$)/;
  var inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
  var _punctuation = /[\p{P}\p{S}]/u;
  var _punctuationOrSpace = /[\s\p{P}\p{S}]/u;
  var _notPunctuationOrSpace = /[^\s\p{P}\p{S}]/u;
  var punctuation = edit(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, _punctuationOrSpace).getRegex();
  var _punctuationGfmStrongEm = /(?!~)[\p{P}\p{S}]/u;
  var _punctuationOrSpaceGfmStrongEm = /(?!~)[\s\p{P}\p{S}]/u;
  var _notPunctuationOrSpaceGfmStrongEm = /(?:[^\s\p{P}\p{S}]|~)/u;
  var blockSkip = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g;
  var emStrongLDelimCore = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
  var emStrongLDelim = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuation).getRegex();
  var emStrongLDelimGfm = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuationGfmStrongEm).getRegex();
  var emStrongRDelimAstCore = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
  var emStrongRDelimAst = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
  var emStrongRDelimAstGfm = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpaceGfmStrongEm).replace(/punctSpace/g, _punctuationOrSpaceGfmStrongEm).replace(/punct/g, _punctuationGfmStrongEm).getRegex();
  var emStrongRDelimUnd = edit("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
  var anyPunctuation = edit(/\\(punct)/, "gu").replace(/punct/g, _punctuation).getRegex();
  var autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
  var _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
  var tag = edit("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
  var _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  var link = edit(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
  var reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
  var nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
  var reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
  var inlineNormal = {
    _backpedal: noopTest,
    // only used for GFM url
    anyPunctuation,
    autolink,
    blockSkip,
    br,
    code: inlineCode,
    del: noopTest,
    emStrongLDelim,
    emStrongRDelimAst,
    emStrongRDelimUnd,
    escape: escape$1,
    link,
    nolink,
    punctuation,
    reflink,
    reflinkSearch,
    tag,
    text: inlineText,
    url: noopTest
  };
  var inlinePedantic = {
    ...inlineNormal,
    link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
  };
  var inlineGfm = {
    ...inlineNormal,
    emStrongRDelimAst: emStrongRDelimAstGfm,
    emStrongLDelim: emStrongLDelimGfm,
    url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
  };
  var inlineBreaks = {
    ...inlineGfm,
    br: edit(br).replace("{2,}", "*").getRegex(),
    text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
  };
  var block = {
    normal: blockNormal,
    gfm: blockGfm,
    pedantic: blockPedantic
  };
  var inline = {
    normal: inlineNormal,
    gfm: inlineGfm,
    breaks: inlineBreaks,
    pedantic: inlinePedantic
  };
  var escapeReplacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  var getEscapeReplacement = (ch) => escapeReplacements[ch];
  function escape(html2, encode) {
    if (encode) {
      if (other.escapeTest.test(html2)) {
        return html2.replace(other.escapeReplace, getEscapeReplacement);
      }
    } else {
      if (other.escapeTestNoEncode.test(html2)) {
        return html2.replace(other.escapeReplaceNoEncode, getEscapeReplacement);
      }
    }
    return html2;
  }
  function cleanUrl(href) {
    try {
      href = encodeURI(href).replace(other.percentDecode, "%");
    } catch {
      return null;
    }
    return href;
  }
  function splitCells(tableRow, count) {
    const row = tableRow.replace(other.findPipe, (match, offset, str) => {
      let escaped = false;
      let curr = offset;
      while (--curr >= 0 && str[curr] === "\\")
        escaped = !escaped;
      if (escaped) {
        return "|";
      } else {
        return " |";
      }
    }), cells = row.split(other.splitPipe);
    let i = 0;
    if (!cells[0].trim()) {
      cells.shift();
    }
    if (cells.length > 0 && !cells.at(-1)?.trim()) {
      cells.pop();
    }
    if (count) {
      if (cells.length > count) {
        cells.splice(count);
      } else {
        while (cells.length < count)
          cells.push("");
      }
    }
    for (; i < cells.length; i++) {
      cells[i] = cells[i].trim().replace(other.slashPipe, "|");
    }
    return cells;
  }
  function rtrim(str, c, invert) {
    const l = str.length;
    if (l === 0) {
      return "";
    }
    let suffLen = 0;
    while (suffLen < l) {
      const currChar = str.charAt(l - suffLen - 1);
      if (currChar === c && true) {
        suffLen++;
      } else {
        break;
      }
    }
    return str.slice(0, l - suffLen);
  }
  function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
      return -1;
    }
    let level = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "\\") {
        i++;
      } else if (str[i] === b[0]) {
        level++;
      } else if (str[i] === b[1]) {
        level--;
        if (level < 0) {
          return i;
        }
      }
    }
    return -1;
  }
  function outputLink(cap, link2, raw, lexer2, rules) {
    const href = link2.href;
    const title = link2.title || null;
    const text = cap[1].replace(rules.other.outputLinkReplace, "$1");
    if (cap[0].charAt(0) !== "!") {
      lexer2.state.inLink = true;
      const token = {
        type: "link",
        raw,
        href,
        title,
        text,
        tokens: lexer2.inlineTokens(text)
      };
      lexer2.state.inLink = false;
      return token;
    }
    return {
      type: "image",
      raw,
      href,
      title,
      text
    };
  }
  function indentCodeCompensation(raw, text, rules) {
    const matchIndentToCode = raw.match(rules.other.indentCodeCompensation);
    if (matchIndentToCode === null) {
      return text;
    }
    const indentToCode = matchIndentToCode[1];
    return text.split("\n").map((node) => {
      const matchIndentInNode = node.match(rules.other.beginningSpace);
      if (matchIndentInNode === null) {
        return node;
      }
      const [indentInNode] = matchIndentInNode;
      if (indentInNode.length >= indentToCode.length) {
        return node.slice(indentToCode.length);
      }
      return node;
    }).join("\n");
  }
  var _Tokenizer = class {
    options;
    rules;
    // set by the lexer
    lexer;
    // set by the lexer
    constructor(options2) {
      this.options = options2 || _defaults;
    }
    space(src) {
      const cap = this.rules.block.newline.exec(src);
      if (cap && cap[0].length > 0) {
        return {
          type: "space",
          raw: cap[0]
        };
      }
    }
    code(src) {
      const cap = this.rules.block.code.exec(src);
      if (cap) {
        const text = cap[0].replace(this.rules.other.codeRemoveIndent, "");
        return {
          type: "code",
          raw: cap[0],
          codeBlockStyle: "indented",
          text: !this.options.pedantic ? rtrim(text, "\n") : text
        };
      }
    }
    fences(src) {
      const cap = this.rules.block.fences.exec(src);
      if (cap) {
        const raw = cap[0];
        const text = indentCodeCompensation(raw, cap[3] || "", this.rules);
        return {
          type: "code",
          raw,
          lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : cap[2],
          text
        };
      }
    }
    heading(src) {
      const cap = this.rules.block.heading.exec(src);
      if (cap) {
        let text = cap[2].trim();
        if (this.rules.other.endingHash.test(text)) {
          const trimmed = rtrim(text, "#");
          if (this.options.pedantic) {
            text = trimmed.trim();
          } else if (!trimmed || this.rules.other.endingSpaceChar.test(trimmed)) {
            text = trimmed.trim();
          }
        }
        return {
          type: "heading",
          raw: cap[0],
          depth: cap[1].length,
          text,
          tokens: this.lexer.inline(text)
        };
      }
    }
    hr(src) {
      const cap = this.rules.block.hr.exec(src);
      if (cap) {
        return {
          type: "hr",
          raw: rtrim(cap[0], "\n")
        };
      }
    }
    blockquote(src) {
      const cap = this.rules.block.blockquote.exec(src);
      if (cap) {
        let lines = rtrim(cap[0], "\n").split("\n");
        let raw = "";
        let text = "";
        const tokens = [];
        while (lines.length > 0) {
          let inBlockquote = false;
          const currentLines = [];
          let i;
          for (i = 0; i < lines.length; i++) {
            if (this.rules.other.blockquoteStart.test(lines[i])) {
              currentLines.push(lines[i]);
              inBlockquote = true;
            } else if (!inBlockquote) {
              currentLines.push(lines[i]);
            } else {
              break;
            }
          }
          lines = lines.slice(i);
          const currentRaw = currentLines.join("\n");
          const currentText = currentRaw.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
          raw = raw ? `${raw}
${currentRaw}` : currentRaw;
          text = text ? `${text}
${currentText}` : currentText;
          const top = this.lexer.state.top;
          this.lexer.state.top = true;
          this.lexer.blockTokens(currentText, tokens, true);
          this.lexer.state.top = top;
          if (lines.length === 0) {
            break;
          }
          const lastToken = tokens.at(-1);
          if (lastToken?.type === "code") {
            break;
          } else if (lastToken?.type === "blockquote") {
            const oldToken = lastToken;
            const newText = oldToken.raw + "\n" + lines.join("\n");
            const newToken = this.blockquote(newText);
            tokens[tokens.length - 1] = newToken;
            raw = raw.substring(0, raw.length - oldToken.raw.length) + newToken.raw;
            text = text.substring(0, text.length - oldToken.text.length) + newToken.text;
            break;
          } else if (lastToken?.type === "list") {
            const oldToken = lastToken;
            const newText = oldToken.raw + "\n" + lines.join("\n");
            const newToken = this.list(newText);
            tokens[tokens.length - 1] = newToken;
            raw = raw.substring(0, raw.length - lastToken.raw.length) + newToken.raw;
            text = text.substring(0, text.length - oldToken.raw.length) + newToken.raw;
            lines = newText.substring(tokens.at(-1).raw.length).split("\n");
            continue;
          }
        }
        return {
          type: "blockquote",
          raw,
          tokens,
          text
        };
      }
    }
    list(src) {
      let cap = this.rules.block.list.exec(src);
      if (cap) {
        let bull = cap[1].trim();
        const isordered = bull.length > 1;
        const list2 = {
          type: "list",
          raw: "",
          ordered: isordered,
          start: isordered ? +bull.slice(0, -1) : "",
          loose: false,
          items: []
        };
        bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
        if (this.options.pedantic) {
          bull = isordered ? bull : "[*+-]";
        }
        const itemRegex = this.rules.other.listItemRegex(bull);
        let endsWithBlankLine = false;
        while (src) {
          let endEarly = false;
          let raw = "";
          let itemContents = "";
          if (!(cap = itemRegex.exec(src))) {
            break;
          }
          if (this.rules.block.hr.test(src)) {
            break;
          }
          raw = cap[0];
          src = src.substring(raw.length);
          let line = cap[2].split("\n", 1)[0].replace(this.rules.other.listReplaceTabs, (t) => " ".repeat(3 * t.length));
          let nextLine = src.split("\n", 1)[0];
          let blankLine = !line.trim();
          let indent = 0;
          if (this.options.pedantic) {
            indent = 2;
            itemContents = line.trimStart();
          } else if (blankLine) {
            indent = cap[1].length + 1;
          } else {
            indent = cap[2].search(this.rules.other.nonSpaceChar);
            indent = indent > 4 ? 1 : indent;
            itemContents = line.slice(indent);
            indent += cap[1].length;
          }
          if (blankLine && this.rules.other.blankLine.test(nextLine)) {
            raw += nextLine + "\n";
            src = src.substring(nextLine.length + 1);
            endEarly = true;
          }
          if (!endEarly) {
            const nextBulletRegex = this.rules.other.nextBulletRegex(indent);
            const hrRegex = this.rules.other.hrRegex(indent);
            const fencesBeginRegex = this.rules.other.fencesBeginRegex(indent);
            const headingBeginRegex = this.rules.other.headingBeginRegex(indent);
            const htmlBeginRegex = this.rules.other.htmlBeginRegex(indent);
            while (src) {
              const rawLine = src.split("\n", 1)[0];
              let nextLineWithoutTabs;
              nextLine = rawLine;
              if (this.options.pedantic) {
                nextLine = nextLine.replace(this.rules.other.listReplaceNesting, "  ");
                nextLineWithoutTabs = nextLine;
              } else {
                nextLineWithoutTabs = nextLine.replace(this.rules.other.tabCharGlobal, "    ");
              }
              if (fencesBeginRegex.test(nextLine)) {
                break;
              }
              if (headingBeginRegex.test(nextLine)) {
                break;
              }
              if (htmlBeginRegex.test(nextLine)) {
                break;
              }
              if (nextBulletRegex.test(nextLine)) {
                break;
              }
              if (hrRegex.test(nextLine)) {
                break;
              }
              if (nextLineWithoutTabs.search(this.rules.other.nonSpaceChar) >= indent || !nextLine.trim()) {
                itemContents += "\n" + nextLineWithoutTabs.slice(indent);
              } else {
                if (blankLine) {
                  break;
                }
                if (line.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4) {
                  break;
                }
                if (fencesBeginRegex.test(line)) {
                  break;
                }
                if (headingBeginRegex.test(line)) {
                  break;
                }
                if (hrRegex.test(line)) {
                  break;
                }
                itemContents += "\n" + nextLine;
              }
              if (!blankLine && !nextLine.trim()) {
                blankLine = true;
              }
              raw += rawLine + "\n";
              src = src.substring(rawLine.length + 1);
              line = nextLineWithoutTabs.slice(indent);
            }
          }
          if (!list2.loose) {
            if (endsWithBlankLine) {
              list2.loose = true;
            } else if (this.rules.other.doubleBlankLine.test(raw)) {
              endsWithBlankLine = true;
            }
          }
          let istask = null;
          let ischecked;
          if (this.options.gfm) {
            istask = this.rules.other.listIsTask.exec(itemContents);
            if (istask) {
              ischecked = istask[0] !== "[ ] ";
              itemContents = itemContents.replace(this.rules.other.listReplaceTask, "");
            }
          }
          list2.items.push({
            type: "list_item",
            raw,
            task: !!istask,
            checked: ischecked,
            loose: false,
            text: itemContents,
            tokens: []
          });
          list2.raw += raw;
        }
        const lastItem = list2.items.at(-1);
        if (lastItem) {
          lastItem.raw = lastItem.raw.trimEnd();
          lastItem.text = lastItem.text.trimEnd();
        } else {
          return;
        }
        list2.raw = list2.raw.trimEnd();
        for (let i = 0; i < list2.items.length; i++) {
          this.lexer.state.top = false;
          list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
          if (!list2.loose) {
            const spacers = list2.items[i].tokens.filter((t) => t.type === "space");
            const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t) => this.rules.other.anyLine.test(t.raw));
            list2.loose = hasMultipleLineBreaks;
          }
        }
        if (list2.loose) {
          for (let i = 0; i < list2.items.length; i++) {
            list2.items[i].loose = true;
          }
        }
        return list2;
      }
    }
    html(src) {
      const cap = this.rules.block.html.exec(src);
      if (cap) {
        const token = {
          type: "html",
          block: true,
          raw: cap[0],
          pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
          text: cap[0]
        };
        return token;
      }
    }
    def(src) {
      const cap = this.rules.block.def.exec(src);
      if (cap) {
        const tag2 = cap[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " ");
        const href = cap[2] ? cap[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
        const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
        return {
          type: "def",
          tag: tag2,
          raw: cap[0],
          href,
          title
        };
      }
    }
    table(src) {
      const cap = this.rules.block.table.exec(src);
      if (!cap) {
        return;
      }
      if (!this.rules.other.tableDelimiter.test(cap[2])) {
        return;
      }
      const headers = splitCells(cap[1]);
      const aligns = cap[2].replace(this.rules.other.tableAlignChars, "").split("|");
      const rows = cap[3]?.trim() ? cap[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [];
      const item = {
        type: "table",
        raw: cap[0],
        header: [],
        align: [],
        rows: []
      };
      if (headers.length !== aligns.length) {
        return;
      }
      for (const align of aligns) {
        if (this.rules.other.tableAlignRight.test(align)) {
          item.align.push("right");
        } else if (this.rules.other.tableAlignCenter.test(align)) {
          item.align.push("center");
        } else if (this.rules.other.tableAlignLeft.test(align)) {
          item.align.push("left");
        } else {
          item.align.push(null);
        }
      }
      for (let i = 0; i < headers.length; i++) {
        item.header.push({
          text: headers[i],
          tokens: this.lexer.inline(headers[i]),
          header: true,
          align: item.align[i]
        });
      }
      for (const row of rows) {
        item.rows.push(splitCells(row, item.header.length).map((cell, i) => {
          return {
            text: cell,
            tokens: this.lexer.inline(cell),
            header: false,
            align: item.align[i]
          };
        }));
      }
      return item;
    }
    lheading(src) {
      const cap = this.rules.block.lheading.exec(src);
      if (cap) {
        return {
          type: "heading",
          raw: cap[0],
          depth: cap[2].charAt(0) === "=" ? 1 : 2,
          text: cap[1],
          tokens: this.lexer.inline(cap[1])
        };
      }
    }
    paragraph(src) {
      const cap = this.rules.block.paragraph.exec(src);
      if (cap) {
        const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
        return {
          type: "paragraph",
          raw: cap[0],
          text,
          tokens: this.lexer.inline(text)
        };
      }
    }
    text(src) {
      const cap = this.rules.block.text.exec(src);
      if (cap) {
        return {
          type: "text",
          raw: cap[0],
          text: cap[0],
          tokens: this.lexer.inline(cap[0])
        };
      }
    }
    escape(src) {
      const cap = this.rules.inline.escape.exec(src);
      if (cap) {
        return {
          type: "escape",
          raw: cap[0],
          text: cap[1]
        };
      }
    }
    tag(src) {
      const cap = this.rules.inline.tag.exec(src);
      if (cap) {
        if (!this.lexer.state.inLink && this.rules.other.startATag.test(cap[0])) {
          this.lexer.state.inLink = true;
        } else if (this.lexer.state.inLink && this.rules.other.endATag.test(cap[0])) {
          this.lexer.state.inLink = false;
        }
        if (!this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(cap[0])) {
          this.lexer.state.inRawBlock = true;
        } else if (this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(cap[0])) {
          this.lexer.state.inRawBlock = false;
        }
        return {
          type: "html",
          raw: cap[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          block: false,
          text: cap[0]
        };
      }
    }
    link(src) {
      const cap = this.rules.inline.link.exec(src);
      if (cap) {
        const trimmedUrl = cap[2].trim();
        if (!this.options.pedantic && this.rules.other.startAngleBracket.test(trimmedUrl)) {
          if (!this.rules.other.endAngleBracket.test(trimmedUrl)) {
            return;
          }
          const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
          if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
            return;
          }
        } else {
          const lastParenIndex = findClosingBracket(cap[2], "()");
          if (lastParenIndex > -1) {
            const start = cap[0].indexOf("!") === 0 ? 5 : 4;
            const linkLen = start + cap[1].length + lastParenIndex;
            cap[2] = cap[2].substring(0, lastParenIndex);
            cap[0] = cap[0].substring(0, linkLen).trim();
            cap[3] = "";
          }
        }
        let href = cap[2];
        let title = "";
        if (this.options.pedantic) {
          const link2 = this.rules.other.pedanticHrefTitle.exec(href);
          if (link2) {
            href = link2[1];
            title = link2[3];
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : "";
        }
        href = href.trim();
        if (this.rules.other.startAngleBracket.test(href)) {
          if (this.options.pedantic && !this.rules.other.endAngleBracket.test(trimmedUrl)) {
            href = href.slice(1);
          } else {
            href = href.slice(1, -1);
          }
        }
        return outputLink(cap, {
          href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
          title: title ? title.replace(this.rules.inline.anyPunctuation, "$1") : title
        }, cap[0], this.lexer, this.rules);
      }
    }
    reflink(src, links) {
      let cap;
      if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
        const linkString = (cap[2] || cap[1]).replace(this.rules.other.multipleSpaceGlobal, " ");
        const link2 = links[linkString.toLowerCase()];
        if (!link2) {
          const text = cap[0].charAt(0);
          return {
            type: "text",
            raw: text,
            text
          };
        }
        return outputLink(cap, link2, cap[0], this.lexer, this.rules);
      }
    }
    emStrong(src, maskedSrc, prevChar = "") {
      let match = this.rules.inline.emStrongLDelim.exec(src);
      if (!match)
        return;
      if (match[3] && prevChar.match(this.rules.other.unicodeAlphaNumeric))
        return;
      const nextChar = match[1] || match[2] || "";
      if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
        const lLength = [...match[0]].length - 1;
        let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
        const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
        endReg.lastIndex = 0;
        maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
        while ((match = endReg.exec(maskedSrc)) != null) {
          rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
          if (!rDelim)
            continue;
          rLength = [...rDelim].length;
          if (match[3] || match[4]) {
            delimTotal += rLength;
            continue;
          } else if (match[5] || match[6]) {
            if (lLength % 3 && !((lLength + rLength) % 3)) {
              midDelimTotal += rLength;
              continue;
            }
          }
          delimTotal -= rLength;
          if (delimTotal > 0)
            continue;
          rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
          const lastCharLength = [...match[0]][0].length;
          const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
          if (Math.min(lLength, rLength) % 2) {
            const text2 = raw.slice(1, -1);
            return {
              type: "em",
              raw,
              text: text2,
              tokens: this.lexer.inlineTokens(text2)
            };
          }
          const text = raw.slice(2, -2);
          return {
            type: "strong",
            raw,
            text,
            tokens: this.lexer.inlineTokens(text)
          };
        }
      }
    }
    codespan(src) {
      const cap = this.rules.inline.code.exec(src);
      if (cap) {
        let text = cap[2].replace(this.rules.other.newLineCharGlobal, " ");
        const hasNonSpaceChars = this.rules.other.nonSpaceChar.test(text);
        const hasSpaceCharsOnBothEnds = this.rules.other.startingSpaceChar.test(text) && this.rules.other.endingSpaceChar.test(text);
        if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
          text = text.substring(1, text.length - 1);
        }
        return {
          type: "codespan",
          raw: cap[0],
          text
        };
      }
    }
    br(src) {
      const cap = this.rules.inline.br.exec(src);
      if (cap) {
        return {
          type: "br",
          raw: cap[0]
        };
      }
    }
    del(src) {
      const cap = this.rules.inline.del.exec(src);
      if (cap) {
        return {
          type: "del",
          raw: cap[0],
          text: cap[2],
          tokens: this.lexer.inlineTokens(cap[2])
        };
      }
    }
    autolink(src) {
      const cap = this.rules.inline.autolink.exec(src);
      if (cap) {
        let text, href;
        if (cap[2] === "@") {
          text = cap[1];
          href = "mailto:" + text;
        } else {
          text = cap[1];
          href = text;
        }
        return {
          type: "link",
          raw: cap[0],
          text,
          href,
          tokens: [
            {
              type: "text",
              raw: text,
              text
            }
          ]
        };
      }
    }
    url(src) {
      let cap;
      if (cap = this.rules.inline.url.exec(src)) {
        let text, href;
        if (cap[2] === "@") {
          text = cap[0];
          href = "mailto:" + text;
        } else {
          let prevCapZero;
          do {
            prevCapZero = cap[0];
            cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? "";
          } while (prevCapZero !== cap[0]);
          text = cap[0];
          if (cap[1] === "www.") {
            href = "http://" + cap[0];
          } else {
            href = cap[0];
          }
        }
        return {
          type: "link",
          raw: cap[0],
          text,
          href,
          tokens: [
            {
              type: "text",
              raw: text,
              text
            }
          ]
        };
      }
    }
    inlineText(src) {
      const cap = this.rules.inline.text.exec(src);
      if (cap) {
        const escaped = this.lexer.state.inRawBlock;
        return {
          type: "text",
          raw: cap[0],
          text: cap[0],
          escaped
        };
      }
    }
  };
  var _Lexer = class __Lexer {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(options2) {
      this.tokens = [];
      this.tokens.links = /* @__PURE__ */ Object.create(null);
      this.options = options2 || _defaults;
      this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
      this.tokenizer = this.options.tokenizer;
      this.tokenizer.options = this.options;
      this.tokenizer.lexer = this;
      this.inlineQueue = [];
      this.state = {
        inLink: false,
        inRawBlock: false,
        top: true
      };
      const rules = {
        other,
        block: block.normal,
        inline: inline.normal
      };
      if (this.options.pedantic) {
        rules.block = block.pedantic;
        rules.inline = inline.pedantic;
      } else if (this.options.gfm) {
        rules.block = block.gfm;
        if (this.options.breaks) {
          rules.inline = inline.breaks;
        } else {
          rules.inline = inline.gfm;
        }
      }
      this.tokenizer.rules = rules;
    }
    /**
     * Expose Rules
     */
    static get rules() {
      return {
        block,
        inline
      };
    }
    /**
     * Static Lex Method
     */
    static lex(src, options2) {
      const lexer2 = new __Lexer(options2);
      return lexer2.lex(src);
    }
    /**
     * Static Lex Inline Method
     */
    static lexInline(src, options2) {
      const lexer2 = new __Lexer(options2);
      return lexer2.inlineTokens(src);
    }
    /**
     * Preprocessing
     */
    lex(src) {
      src = src.replace(other.carriageReturn, "\n");
      this.blockTokens(src, this.tokens);
      for (let i = 0; i < this.inlineQueue.length; i++) {
        const next = this.inlineQueue[i];
        this.inlineTokens(next.src, next.tokens);
      }
      this.inlineQueue = [];
      return this.tokens;
    }
    blockTokens(src, tokens = [], lastParagraphClipped = false) {
      if (this.options.pedantic) {
        src = src.replace(other.tabCharGlobal, "    ").replace(other.spaceLine, "");
      }
      while (src) {
        let token;
        if (this.options.extensions?.block?.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          continue;
        }
        if (token = this.tokenizer.space(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (token.raw.length === 1 && lastToken !== void 0) {
            lastToken.raw += "\n";
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.code(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (lastToken?.type === "paragraph" || lastToken?.type === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.at(-1).src = lastToken.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.fences(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.heading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.hr(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.blockquote(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.list(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.html(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.def(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (lastToken?.type === "paragraph" || lastToken?.type === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.raw;
            this.inlineQueue.at(-1).src = lastToken.text;
          } else if (!this.tokens.links[token.tag]) {
            this.tokens.links[token.tag] = {
              href: token.href,
              title: token.title
            };
          }
          continue;
        }
        if (token = this.tokenizer.table(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.lheading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        let cutSrc = src;
        if (this.options.extensions?.startBlock) {
          let startIndex = Infinity;
          const tempSrc = src.slice(1);
          let tempStart;
          this.options.extensions.startBlock.forEach((getStartIndex) => {
            tempStart = getStartIndex.call({ lexer: this }, tempSrc);
            if (typeof tempStart === "number" && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
          const lastToken = tokens.at(-1);
          if (lastParagraphClipped && lastToken?.type === "paragraph") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.pop();
            this.inlineQueue.at(-1).src = lastToken.text;
          } else {
            tokens.push(token);
          }
          lastParagraphClipped = cutSrc.length !== src.length;
          src = src.substring(token.raw.length);
          continue;
        }
        if (token = this.tokenizer.text(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (lastToken?.type === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.pop();
            this.inlineQueue.at(-1).src = lastToken.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (src) {
          const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }
      this.state.top = true;
      return tokens;
    }
    inline(src, tokens = []) {
      this.inlineQueue.push({ src, tokens });
      return tokens;
    }
    /**
     * Lexing/Compiling
     */
    inlineTokens(src, tokens = []) {
      let maskedSrc = src;
      let match = null;
      if (this.tokens.links) {
        const links = Object.keys(this.tokens.links);
        if (links.length > 0) {
          while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
            if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
              maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
            }
          }
        }
      }
      while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      }
      while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      }
      let keepPrevChar = false;
      let prevChar = "";
      while (src) {
        if (!keepPrevChar) {
          prevChar = "";
        }
        keepPrevChar = false;
        let token;
        if (this.options.extensions?.inline?.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          continue;
        }
        if (token = this.tokenizer.escape(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.tag(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.link(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.reflink(src, this.tokens.links)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (token.type === "text" && lastToken?.type === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.codespan(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.br(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.del(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.autolink(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (!this.state.inLink && (token = this.tokenizer.url(src))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        let cutSrc = src;
        if (this.options.extensions?.startInline) {
          let startIndex = Infinity;
          const tempSrc = src.slice(1);
          let tempStart;
          this.options.extensions.startInline.forEach((getStartIndex) => {
            tempStart = getStartIndex.call({ lexer: this }, tempSrc);
            if (typeof tempStart === "number" && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (token = this.tokenizer.inlineText(cutSrc)) {
          src = src.substring(token.raw.length);
          if (token.raw.slice(-1) !== "_") {
            prevChar = token.raw.slice(-1);
          }
          keepPrevChar = true;
          const lastToken = tokens.at(-1);
          if (lastToken?.type === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (src) {
          const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }
      return tokens;
    }
  };
  var _Renderer = class {
    options;
    parser;
    // set by the parser
    constructor(options2) {
      this.options = options2 || _defaults;
    }
    space(token) {
      return "";
    }
    code({ text, lang, escaped }) {
      const langString = (lang || "").match(other.notSpaceStart)?.[0];
      const code = text.replace(other.endingNewline, "") + "\n";
      if (!langString) {
        return "<pre><code>" + (escaped ? code : escape(code, true)) + "</code></pre>\n";
      }
      return '<div data-code-lang="' + escape(langString) + '">' + (escaped ? code : escape(code, true)) + "</div>";
    }
    blockquote({ tokens }) {
      const body = this.parser.parse(tokens);
      return `<blockquote>
${body}</blockquote>
`;
    }
    html({ text }) {
      return text;
    }
    heading({ tokens, depth }) {
      return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>
`;
    }
    hr(token) {
      return "<hr>\n";
    }
    list(token) {
      const ordered = token.ordered;
      const start = token.start;
      let body = "";
      for (let j = 0; j < token.items.length; j++) {
        const item = token.items[j];
        body += this.listitem(item);
      }
      const type5 = ordered ? "ol" : "ul";
      const startAttr = ordered && start !== 1 ? ' start="' + start + '"' : "";
      return "<" + type5 + startAttr + ">\n" + body + "</" + type5 + ">\n";
    }
    listitem(item) {
      let itemBody = "";
      if (item.task) {
        const checkbox = this.checkbox({ checked: !!item.checked });
        if (item.loose) {
          if (item.tokens[0]?.type === "paragraph") {
            item.tokens[0].text = checkbox + " " + item.tokens[0].text;
            if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
              item.tokens[0].tokens[0].text = checkbox + " " + escape(item.tokens[0].tokens[0].text);
              item.tokens[0].tokens[0].escaped = true;
            }
          } else {
            item.tokens.unshift({
              type: "text",
              raw: checkbox + " ",
              text: checkbox + " ",
              escaped: true
            });
          }
        } else {
          itemBody += checkbox + " ";
        }
      }
      itemBody += this.parser.parse(item.tokens, !!item.loose);
      return `<li>${itemBody}</li>
`;
    }
    checkbox({ checked }) {
      return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
    }
    paragraph({ tokens }) {
      return `<p>${this.parser.parseInline(tokens)}</p>
`;
    }
    table(token) {
      let header = "";
      let cell = "";
      for (let j = 0; j < token.header.length; j++) {
        cell += this.tablecell(token.header[j]);
      }
      header += this.tablerow({ text: cell });
      let body = "";
      for (let j = 0; j < token.rows.length; j++) {
        const row = token.rows[j];
        cell = "";
        for (let k = 0; k < row.length; k++) {
          cell += this.tablecell(row[k]);
        }
        body += this.tablerow({ text: cell });
      }
      if (body)
        body = `<tbody>${body}</tbody>`;
      return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
    }
    tablerow({ text }) {
      return `<tr>
${text}</tr>
`;
    }
    tablecell(token) {
      const content = this.parser.parseInline(token.tokens);
      const type5 = token.header ? "th" : "td";
      const tag2 = token.align ? `<${type5} align="${token.align}">` : `<${type5}>`;
      return tag2 + content + `</${type5}>
`;
    }
    /**
     * span level renderer
     */
    strong({ tokens }) {
      return `<strong>${this.parser.parseInline(tokens)}</strong>`;
    }
    em({ tokens }) {
      return `<em>${this.parser.parseInline(tokens)}</em>`;
    }
    codespan({ text }) {
      return `<code>${escape(text, true)}</code>`;
    }
    br(token) {
      return "<br>";
    }
    del({ tokens }) {
      return `<del>${this.parser.parseInline(tokens)}</del>`;
    }
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const cleanHref = cleanUrl(href);
      if (cleanHref === null) {
        return text;
      }
      href = cleanHref;
      let out = '<a href="' + href + '"';
      if (title) {
        out += ' title="' + escape(title) + '"';
      }
      out += ">" + text + "</a>";
      return out;
    }
    image({ href, title, text }) {
      const cleanHref = cleanUrl(href);
      if (cleanHref === null) {
        return escape(text);
      }
      href = cleanHref;
      let out = `<img src="${href}" alt="${text}"`;
      if (title) {
        out += ` title="${escape(title)}"`;
      }
      out += ">";
      return out;
    }
    text(token) {
      return "tokens" in token && token.tokens ? this.parser.parseInline(token.tokens) : "escaped" in token && token.escaped ? token.text : escape(token.text);
    }
  };
  var _TextRenderer = class {
    // no need for block level renderers
    strong({ text }) {
      return text;
    }
    em({ text }) {
      return text;
    }
    codespan({ text }) {
      return text;
    }
    del({ text }) {
      return text;
    }
    html({ text }) {
      return text;
    }
    text({ text }) {
      return text;
    }
    link({ text }) {
      return "" + text;
    }
    image({ text }) {
      return "" + text;
    }
    br() {
      return "";
    }
  };
  var _Parser = class __Parser {
    options;
    renderer;
    textRenderer;
    constructor(options2) {
      this.options = options2 || _defaults;
      this.options.renderer = this.options.renderer || new _Renderer();
      this.renderer = this.options.renderer;
      this.renderer.options = this.options;
      this.renderer.parser = this;
      this.textRenderer = new _TextRenderer();
    }
    /**
     * Static Parse Method
     */
    static parse(tokens, options2) {
      const parser2 = new __Parser(options2);
      return parser2.parse(tokens);
    }
    /**
     * Static Parse Inline Method
     */
    static parseInline(tokens, options2) {
      const parser2 = new __Parser(options2);
      return parser2.parseInline(tokens);
    }
    /**
     * Parse Loop
     */
    parse(tokens, top = true) {
      let out = "";
      for (let i = 0; i < tokens.length; i++) {
        const anyToken = tokens[i];
        if (this.options.extensions?.renderers?.[anyToken.type]) {
          const genericToken = anyToken;
          const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
          if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
            out += ret || "";
            continue;
          }
        }
        const token = anyToken;
        switch (token.type) {
          case "space": {
            out += this.renderer.space(token);
            continue;
          }
          case "hr": {
            out += this.renderer.hr(token);
            continue;
          }
          case "heading": {
            out += this.renderer.heading(token);
            continue;
          }
          case "code": {
            out += this.renderer.code(token);
            continue;
          }
          case "table": {
            out += this.renderer.table(token);
            continue;
          }
          case "blockquote": {
            out += this.renderer.blockquote(token);
            continue;
          }
          case "list": {
            out += this.renderer.list(token);
            continue;
          }
          case "html": {
            out += this.renderer.html(token);
            continue;
          }
          case "paragraph": {
            out += this.renderer.paragraph(token);
            continue;
          }
          case "text": {
            let textToken = token;
            let body = this.renderer.text(textToken);
            while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
              textToken = tokens[++i];
              body += "\n" + this.renderer.text(textToken);
            }
            if (top) {
              out += this.renderer.paragraph({
                type: "paragraph",
                raw: body,
                text: body,
                tokens: [{ type: "text", raw: body, text: body, escaped: true }]
              });
            } else {
              out += body;
            }
            continue;
          }
          default: {
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return "";
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }
      return out;
    }
    /**
     * Parse Inline Tokens
     */
    parseInline(tokens, renderer = this.renderer) {
      let out = "";
      for (let i = 0; i < tokens.length; i++) {
        const anyToken = tokens[i];
        if (this.options.extensions?.renderers?.[anyToken.type]) {
          const ret = this.options.extensions.renderers[anyToken.type].call({ parser: this }, anyToken);
          if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(anyToken.type)) {
            out += ret || "";
            continue;
          }
        }
        const token = anyToken;
        switch (token.type) {
          case "escape": {
            out += renderer.text(token);
            break;
          }
          case "html": {
            out += renderer.html(token);
            break;
          }
          case "link": {
            out += renderer.link(token);
            break;
          }
          case "image": {
            out += renderer.image(token);
            break;
          }
          case "strong": {
            out += renderer.strong(token);
            break;
          }
          case "em": {
            out += renderer.em(token);
            break;
          }
          case "codespan": {
            out += renderer.codespan(token);
            break;
          }
          case "br": {
            out += renderer.br(token);
            break;
          }
          case "del": {
            out += renderer.del(token);
            break;
          }
          case "text": {
            out += renderer.text(token);
            break;
          }
          default: {
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return "";
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }
      return out;
    }
  };
  var _Hooks = class {
    options;
    block;
    constructor(options2) {
      this.options = options2 || _defaults;
    }
    static passThroughHooks = /* @__PURE__ */ new Set([
      "preprocess",
      "postprocess",
      "processAllTokens"
    ]);
    /**
     * Process markdown before marked
     */
    preprocess(markdown) {
      return markdown;
    }
    /**
     * Process HTML after marked is finished
     */
    postprocess(html2) {
      return html2;
    }
    /**
     * Process all tokens before walk tokens
     */
    processAllTokens(tokens) {
      return tokens;
    }
    /**
     * Provide function to tokenize markdown
     */
    provideLexer() {
      return this.block ? _Lexer.lex : _Lexer.lexInline;
    }
    /**
     * Provide function to parse tokens
     */
    provideParser() {
      return this.block ? _Parser.parse : _Parser.parseInline;
    }
  };
  var Marked = class {
    defaults = _getDefaults();
    options = this.setOptions;
    parse = this.parseMarkdown(true);
    parseInline = this.parseMarkdown(false);
    Parser = _Parser;
    Renderer = _Renderer;
    TextRenderer = _TextRenderer;
    Lexer = _Lexer;
    Tokenizer = _Tokenizer;
    Hooks = _Hooks;
    constructor(...args) {
      this.use(...args);
    }
    /**
     * Run callback for every token
     */
    walkTokens(tokens, callback) {
      let values = [];
      for (const token of tokens) {
        values = values.concat(callback.call(this, token));
        switch (token.type) {
          case "table": {
            const tableToken = token;
            for (const cell of tableToken.header) {
              values = values.concat(this.walkTokens(cell.tokens, callback));
            }
            for (const row of tableToken.rows) {
              for (const cell of row) {
                values = values.concat(this.walkTokens(cell.tokens, callback));
              }
            }
            break;
          }
          case "list": {
            const listToken = token;
            values = values.concat(this.walkTokens(listToken.items, callback));
            break;
          }
          default: {
            const genericToken = token;
            if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
              this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
                const tokens2 = genericToken[childTokens].flat(Infinity);
                values = values.concat(this.walkTokens(tokens2, callback));
              });
            } else if (genericToken.tokens) {
              values = values.concat(this.walkTokens(genericToken.tokens, callback));
            }
          }
        }
      }
      return values;
    }
    use(...args) {
      const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
      args.forEach((pack) => {
        const opts = { ...pack };
        opts.async = this.defaults.async || opts.async || false;
        if (pack.extensions) {
          pack.extensions.forEach((ext) => {
            if (!ext.name) {
              throw new Error("extension name required");
            }
            if ("renderer" in ext) {
              const prevRenderer = extensions.renderers[ext.name];
              if (prevRenderer) {
                extensions.renderers[ext.name] = function(...args2) {
                  let ret = ext.renderer.apply(this, args2);
                  if (ret === false) {
                    ret = prevRenderer.apply(this, args2);
                  }
                  return ret;
                };
              } else {
                extensions.renderers[ext.name] = ext.renderer;
              }
            }
            if ("tokenizer" in ext) {
              if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
                throw new Error("extension level must be 'block' or 'inline'");
              }
              const extLevel = extensions[ext.level];
              if (extLevel) {
                extLevel.unshift(ext.tokenizer);
              } else {
                extensions[ext.level] = [ext.tokenizer];
              }
              if (ext.start) {
                if (ext.level === "block") {
                  if (extensions.startBlock) {
                    extensions.startBlock.push(ext.start);
                  } else {
                    extensions.startBlock = [ext.start];
                  }
                } else if (ext.level === "inline") {
                  if (extensions.startInline) {
                    extensions.startInline.push(ext.start);
                  } else {
                    extensions.startInline = [ext.start];
                  }
                }
              }
            }
            if ("childTokens" in ext && ext.childTokens) {
              extensions.childTokens[ext.name] = ext.childTokens;
            }
          });
          opts.extensions = extensions;
        }
        if (pack.renderer) {
          const renderer = this.defaults.renderer || new _Renderer(this.defaults);
          for (const prop in pack.renderer) {
            if (!(prop in renderer)) {
              throw new Error(`renderer '${prop}' does not exist`);
            }
            if (["options", "parser"].includes(prop)) {
              continue;
            }
            const rendererProp = prop;
            const rendererFunc = pack.renderer[rendererProp];
            const prevRenderer = renderer[rendererProp];
            renderer[rendererProp] = (...args2) => {
              let ret = rendererFunc.apply(renderer, args2);
              if (ret === false) {
                ret = prevRenderer.apply(renderer, args2);
              }
              return ret || "";
            };
          }
          opts.renderer = renderer;
        }
        if (pack.tokenizer) {
          const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
          for (const prop in pack.tokenizer) {
            if (!(prop in tokenizer)) {
              throw new Error(`tokenizer '${prop}' does not exist`);
            }
            if (["options", "rules", "lexer"].includes(prop)) {
              continue;
            }
            const tokenizerProp = prop;
            const tokenizerFunc = pack.tokenizer[tokenizerProp];
            const prevTokenizer = tokenizer[tokenizerProp];
            tokenizer[tokenizerProp] = (...args2) => {
              let ret = tokenizerFunc.apply(tokenizer, args2);
              if (ret === false) {
                ret = prevTokenizer.apply(tokenizer, args2);
              }
              return ret;
            };
          }
          opts.tokenizer = tokenizer;
        }
        if (pack.hooks) {
          const hooks = this.defaults.hooks || new _Hooks();
          for (const prop in pack.hooks) {
            if (!(prop in hooks)) {
              throw new Error(`hook '${prop}' does not exist`);
            }
            if (["options", "block"].includes(prop)) {
              continue;
            }
            const hooksProp = prop;
            const hooksFunc = pack.hooks[hooksProp];
            const prevHook = hooks[hooksProp];
            if (_Hooks.passThroughHooks.has(prop)) {
              hooks[hooksProp] = (arg) => {
                if (this.defaults.async) {
                  return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                    return prevHook.call(hooks, ret2);
                  });
                }
                const ret = hooksFunc.call(hooks, arg);
                return prevHook.call(hooks, ret);
              };
            } else {
              hooks[hooksProp] = (...args2) => {
                let ret = hooksFunc.apply(hooks, args2);
                if (ret === false) {
                  ret = prevHook.apply(hooks, args2);
                }
                return ret;
              };
            }
          }
          opts.hooks = hooks;
        }
        if (pack.walkTokens) {
          const walkTokens2 = this.defaults.walkTokens;
          const packWalktokens = pack.walkTokens;
          opts.walkTokens = function(token) {
            let values = [];
            values.push(packWalktokens.call(this, token));
            if (walkTokens2) {
              values = values.concat(walkTokens2.call(this, token));
            }
            return values;
          };
        }
        this.defaults = { ...this.defaults, ...opts };
      });
      return this;
    }
    setOptions(opt) {
      this.defaults = { ...this.defaults, ...opt };
      return this;
    }
    lexer(src, options2) {
      return _Lexer.lex(src, options2 ?? this.defaults);
    }
    parser(tokens, options2) {
      return _Parser.parse(tokens, options2 ?? this.defaults);
    }
    parseMarkdown(blockType) {
      const parse = (src, options2) => {
        const origOpt = { ...options2 };
        const opt = { ...this.defaults, ...origOpt };
        const throwError = this.onError(!!opt.silent, !!opt.async);
        if (this.defaults.async === true && origOpt.async === false) {
          return throwError(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
        }
        if (typeof src === "undefined" || src === null) {
          return throwError(new Error("marked(): input parameter is undefined or null"));
        }
        if (typeof src !== "string") {
          return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
        }
        if (opt.hooks) {
          opt.hooks.options = opt;
          opt.hooks.block = blockType;
        }
        const lexer2 = opt.hooks ? opt.hooks.provideLexer() : blockType ? _Lexer.lex : _Lexer.lexInline;
        const parser2 = opt.hooks ? opt.hooks.provideParser() : blockType ? _Parser.parse : _Parser.parseInline;
        if (opt.async) {
          return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html2) => opt.hooks ? opt.hooks.postprocess(html2) : html2).catch(throwError);
        }
        try {
          if (opt.hooks) {
            src = opt.hooks.preprocess(src);
          }
          let tokens = lexer2(src, opt);
          if (opt.hooks) {
            tokens = opt.hooks.processAllTokens(tokens);
          }
          if (opt.walkTokens) {
            this.walkTokens(tokens, opt.walkTokens);
          }
          let html2 = parser2(tokens, opt);
          if (opt.hooks) {
            html2 = opt.hooks.postprocess(html2);
          }
          return html2;
        } catch (e) {
          return throwError(e);
        }
      };
      return parse;
    }
    onError(silent, async) {
      return (e) => {
        e.message += "\nPlease report this to https://github.com/markedjs/marked.";
        if (silent) {
          const msg = "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
          if (async) {
            return Promise.resolve(msg);
          }
          return msg;
        }
        if (async) {
          return Promise.reject(e);
        }
        throw e;
      };
    }
  };
  var markedInstance = new Marked();
  function marked(src, opt) {
    return markedInstance.parse(src, opt);
  }
  marked.options = marked.setOptions = function(options2) {
    markedInstance.setOptions(options2);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
  };
  marked.getDefaults = _getDefaults;
  marked.defaults = _defaults;
  marked.use = function(...args) {
    markedInstance.use(...args);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
  };
  marked.walkTokens = function(tokens, callback) {
    return markedInstance.walkTokens(tokens, callback);
  };
  marked.parseInline = markedInstance.parseInline;
  marked.Parser = _Parser;
  marked.parser = _Parser.parse;
  marked.Renderer = _Renderer;
  marked.TextRenderer = _TextRenderer;
  marked.Lexer = _Lexer;
  marked.lexer = _Lexer.lex;
  marked.Tokenizer = _Tokenizer;
  marked.Hooks = _Hooks;
  marked.parse = marked;
  var options = marked.options;
  var setOptions = marked.setOptions;
  var use = marked.use;
  var walkTokens = marked.walkTokens;
  var parseInline = marked.parseInline;
  var parser = _Parser.parse;
  var lexer = _Lexer.lex;

  // import("./languages/**/*.js") in layx/others/syntax_highlighter/syntax_highlighter.js
  var globImport_languages_js = __glob({
    "./languages/asm.js": () => Promise.resolve().then(() => (init_asm(), asm_exports)),
    "./languages/bash.js": () => Promise.resolve().then(() => (init_bash(), bash_exports)),
    "./languages/bf.js": () => Promise.resolve().then(() => (init_bf(), bf_exports)),
    "./languages/c.js": () => Promise.resolve().then(() => (init_c(), c_exports)),
    "./languages/css.js": () => Promise.resolve().then(() => (init_css(), css_exports)),
    "./languages/csv.js": () => Promise.resolve().then(() => (init_csv(), csv_exports)),
    "./languages/diff.js": () => Promise.resolve().then(() => (init_diff(), diff_exports)),
    "./languages/docker.js": () => Promise.resolve().then(() => (init_docker(), docker_exports)),
    "./languages/git.js": () => Promise.resolve().then(() => (init_git(), git_exports)),
    "./languages/go.js": () => Promise.resolve().then(() => (init_go(), go_exports)),
    "./languages/html.js": () => Promise.resolve().then(() => (init_html(), html_exports)),
    "./languages/http.js": () => Promise.resolve().then(() => (init_http(), http_exports)),
    "./languages/ini.js": () => Promise.resolve().then(() => (init_ini(), ini_exports)),
    "./languages/java.js": () => Promise.resolve().then(() => (init_java(), java_exports)),
    "./languages/js.js": () => Promise.resolve().then(() => (init_js(), js_exports)),
    "./languages/js_template_literals.js": () => Promise.resolve().then(() => (init_js_template_literals(), js_template_literals_exports)),
    "./languages/jsdoc.js": () => Promise.resolve().then(() => (init_jsdoc(), jsdoc_exports)),
    "./languages/json.js": () => Promise.resolve().then(() => (init_json(), json_exports)),
    "./languages/leanpub-md.js": () => Promise.resolve().then(() => (init_leanpub_md(), leanpub_md_exports)),
    "./languages/log.js": () => Promise.resolve().then(() => (init_log(), log_exports)),
    "./languages/lua.js": () => Promise.resolve().then(() => (init_lua(), lua_exports)),
    "./languages/make.js": () => Promise.resolve().then(() => (init_make(), make_exports)),
    "./languages/md.js": () => Promise.resolve().then(() => (init_md(), md_exports)),
    "./languages/pl.js": () => Promise.resolve().then(() => (init_pl(), pl_exports)),
    "./languages/plain.js": () => Promise.resolve().then(() => (init_plain(), plain_exports)),
    "./languages/py.js": () => Promise.resolve().then(() => (init_py(), py_exports)),
    "./languages/regex.js": () => Promise.resolve().then(() => (init_regex(), regex_exports)),
    "./languages/rs.js": () => Promise.resolve().then(() => (init_rs(), rs_exports)),
    "./languages/sql.js": () => Promise.resolve().then(() => (init_sql(), sql_exports)),
    "./languages/todo.js": () => Promise.resolve().then(() => (init_todo(), todo_exports)),
    "./languages/toml.js": () => Promise.resolve().then(() => (init_toml(), toml_exports)),
    "./languages/ts.js": () => Promise.resolve().then(() => (init_ts(), ts_exports)),
    "./languages/uri.js": () => Promise.resolve().then(() => (init_uri(), uri_exports)),
    "./languages/xml.js": () => Promise.resolve().then(() => (init_xml(), xml_exports)),
    "./languages/yaml.js": () => Promise.resolve().then(() => (init_yaml(), yaml_exports))
  });

  // layx/others/syntax_highlighter/syntax_highlighter.js
  var expandData = {
    num: {
      type: "num",
      match: /(\.e?|\b)\d(e-|[\d.oxa-fA-F_])*(\.|\b)/g
    },
    str: {
      type: "str",
      match: /(["'])(\\[^]|(?!\1)[^\r\n\\])*\1?/g
    },
    strDouble: {
      type: "str",
      match: /"((?!")[^\r\n\\]|\\[^])*"?/g
    }
  };
  var langs = /* @__PURE__ */ new Map();
  var sanitize = (str = "") => {
    const entities = {
      "&": "&#38;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return str.replace(/[&<>"']/g, (char) => entities[char]);
  };
  var toSpan = (str, token) => token ? `<span class="${token}">${str}</span>` : str;
  async function tokenize(src, lang, token) {
    try {
      let data;
      if (typeof lang === "string") {
        data = langs.get(lang);
        if (!data) {
          data = await globImport_languages_js(`./languages/${lang}.js`);
          if (!data?.default) {
            throw new Error(`Invalid language module for ${lang}`);
          }
        }
      } else {
        data = lang;
      }
      let m, part, first = {}, match, cache = [], i = 0, arr = Array.isArray(data.sub) ? [...data.sub] : Array.isArray(data.default) ? [...data.default] : [];
      if (arr.length === 0) {
        token(src);
        return;
      }
      while (i < src.length) {
        first.index = null;
        for (m = arr.length; m-- > 0; ) {
          part = arr[m].expand ? expandData[arr[m].expand] : arr[m];
          if (cache[m] === void 0 || cache[m].match.index < i) {
            part.match.lastIndex = i;
            match = part.match.exec(src);
            if (match === null) {
              arr.splice(m, 1);
              cache.splice(m, 1);
              continue;
            }
            cache[m] = { match, lastIndex: part.match.lastIndex };
          }
          if (cache[m].match[0] && (cache[m].match.index <= first.index || first.index === null))
            first = {
              part,
              index: cache[m].match.index,
              match: cache[m].match[0],
              end: cache[m].lastIndex
            };
        }
        if (first.index === null)
          break;
        token(src.slice(i, first.index), data.type);
        i = first.end;
        if (first.part.sub)
          await tokenize(first.match, typeof first.part.sub === "string" ? first.part.sub : typeof first.part.sub === "function" ? first.part.sub(first.match) : first.part, token);
        else
          token(first.match, first.part.type);
      }
      token(src.slice(i, src.length), data.type);
    } catch (error) {
      console.error(`Tokenization error: ${error.message}`);
      token(src);
    }
  }
  async function highlightText(src, lang, multiline = true, opt = {}) {
    let tmp = "";
    await tokenize(src, lang, (str, type5) => tmp += toSpan(sanitize(str), type5));
    return multiline ? `<div class="wrapper"><div class="numbers">${"<div></div>".repeat(!opt.hideLineNumbers && src.split("\n").length)}</div><code class="code">${tmp}</code></div>` : tmp;
  }
  async function highlightElement(elm, lang = elm.dataset.codeLang, mode, opt) {
    let txt = elm.textContent;
    mode ??= `${txt.split("\n").length < 2 ? "one" : "multi"}line`;
    elm.className = `${[...elm.classList].filter((className) => !className.startsWith("")).join(" ")}code-block ${lang} ${mode} highlighted`;
    elm.innerHTML = await highlightText(txt, lang, mode == "multiline", opt);
  }
  var highlightAll = async (opt) => Promise.all(
    Array.from(document.querySelectorAll("[data-code-lang]:not(.highlighted)")).map((elm) => highlightElement(elm, void 0, void 0, opt))
  );

  // node_modules/whatwg-fetch/fetch.js
  var g = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || // eslint-disable-next-line no-undef
  typeof global !== "undefined" && global || {};
  var support = {
    searchParams: "URLSearchParams" in g,
    iterable: "Symbol" in g && "iterator" in Symbol,
    blob: "FileReader" in g && "Blob" in g && function() {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: "FormData" in g,
    arrayBuffer: "ArrayBuffer" in g
  };
  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj);
  }
  if (support.arrayBuffer) {
    viewClasses = [
      "[object Int8Array]",
      "[object Uint8Array]",
      "[object Uint8ClampedArray]",
      "[object Int16Array]",
      "[object Uint16Array]",
      "[object Int32Array]",
      "[object Uint32Array]",
      "[object Float32Array]",
      "[object Float64Array]"
    ];
    isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }
  var viewClasses;
  var isArrayBufferView;
  function normalizeName(name2) {
    if (typeof name2 !== "string") {
      name2 = String(name2);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name2) || name2 === "") {
      throw new TypeError('Invalid character in header field name: "' + name2 + '"');
    }
    return name2.toLowerCase();
  }
  function normalizeValue(value) {
    if (typeof value !== "string") {
      value = String(value);
    }
    return value;
  }
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return { done: value === void 0, value };
      }
    };
    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator;
      };
    }
    return iterator;
  }
  function Headers(headers) {
    this.map = {};
    if (headers instanceof Headers) {
      headers.forEach(function(value, name2) {
        this.append(name2, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        if (header.length != 2) {
          throw new TypeError("Headers constructor: expected name/value pair to be length 2, found" + header.length);
        }
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name2) {
        this.append(name2, headers[name2]);
      }, this);
    }
  }
  Headers.prototype.append = function(name2, value) {
    name2 = normalizeName(name2);
    value = normalizeValue(value);
    var oldValue = this.map[name2];
    this.map[name2] = oldValue ? oldValue + ", " + value : value;
  };
  Headers.prototype["delete"] = function(name2) {
    delete this.map[normalizeName(name2)];
  };
  Headers.prototype.get = function(name2) {
    name2 = normalizeName(name2);
    return this.has(name2) ? this.map[name2] : null;
  };
  Headers.prototype.has = function(name2) {
    return this.map.hasOwnProperty(normalizeName(name2));
  };
  Headers.prototype.set = function(name2, value) {
    this.map[normalizeName(name2)] = normalizeValue(value);
  };
  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name2 in this.map) {
      if (this.map.hasOwnProperty(name2)) {
        callback.call(thisArg, this.map[name2], name2, this);
      }
    }
  };
  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name2) {
      items.push(name2);
    });
    return iteratorFor(items);
  };
  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items);
  };
  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name2) {
      items.push([name2, value]);
    });
    return iteratorFor(items);
  };
  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }
  function consumed(body) {
    if (body._noBody) return;
    if (body.bodyUsed) {
      return Promise.reject(new TypeError("Already read"));
    }
    body.bodyUsed = true;
  }
  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    });
  }
  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }
  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
    var encoding = match ? match[1] : "utf-8";
    reader.readAsText(blob, encoding);
    return promise;
  }
  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);
    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join("");
  }
  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }
  function Body() {
    this.bodyUsed = false;
    this._initBody = function(body) {
      this.bodyUsed = this.bodyUsed;
      this._bodyInit = body;
      if (!body) {
        this._noBody = true;
        this._bodyText = "";
      } else if (typeof body === "string") {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }
      if (!this.headers.get("content-type")) {
        if (typeof body === "string") {
          this.headers.set("content-type", "text/plain;charset=UTF-8");
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set("content-type", this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
        }
      }
    };
    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }
        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error("could not read FormData body as blob");
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };
    }
    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        var isConsumed = consumed(this);
        if (isConsumed) {
          return isConsumed;
        } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
          return Promise.resolve(
            this._bodyArrayBuffer.buffer.slice(
              this._bodyArrayBuffer.byteOffset,
              this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
            )
          );
        } else {
          return Promise.resolve(this._bodyArrayBuffer);
        }
      } else if (support.blob) {
        return this.blob().then(readBlobAsArrayBuffer);
      } else {
        throw new Error("could not read as ArrayBuffer");
      }
    };
    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }
      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error("could not read FormData body as text");
      } else {
        return Promise.resolve(this._bodyText);
      }
    };
    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode);
      };
    }
    this.json = function() {
      return this.text().then(JSON.parse);
    };
    return this;
  }
  var methods = ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"];
  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }
  function Request(input, options2) {
    if (!(this instanceof Request)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
    }
    options2 = options2 || {};
    var body = options2.body;
    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError("Already read");
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options2.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }
    this.credentials = options2.credentials || this.credentials || "same-origin";
    if (options2.headers || !this.headers) {
      this.headers = new Headers(options2.headers);
    }
    this.method = normalizeMethod(options2.method || this.method || "GET");
    this.mode = options2.mode || this.mode || null;
    this.signal = options2.signal || this.signal || function() {
      if ("AbortController" in g) {
        var ctrl = new AbortController();
        return ctrl.signal;
      }
    }();
    this.referrer = null;
    if ((this.method === "GET" || this.method === "HEAD") && body) {
      throw new TypeError("Body not allowed for GET or HEAD requests");
    }
    this._initBody(body);
    if (this.method === "GET" || this.method === "HEAD") {
      if (options2.cache === "no-store" || options2.cache === "no-cache") {
        var reParamSearch = /([?&])_=[^&]*/;
        if (reParamSearch.test(this.url)) {
          this.url = this.url.replace(reParamSearch, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
        } else {
          var reQueryString = /\?/;
          this.url += (reQueryString.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
        }
      }
    }
  }
  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit });
  };
  function decode(body) {
    var form = new FormData();
    body.trim().split("&").forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split("=");
        var name2 = split.shift().replace(/\+/g, " ");
        var value = split.join("=").replace(/\+/g, " ");
        form.append(decodeURIComponent(name2), decodeURIComponent(value));
      }
    });
    return form;
  }
  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
    preProcessedHeaders.split("\r").map(function(header) {
      return header.indexOf("\n") === 0 ? header.substr(1, header.length) : header;
    }).forEach(function(line) {
      var parts = line.split(":");
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(":").trim();
        try {
          headers.append(key, value);
        } catch (error) {
          console.warn("Response " + error.message);
        }
      }
    });
    return headers;
  }
  Body.call(Request.prototype);
  function Response(bodyInit, options2) {
    if (!(this instanceof Response)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
    }
    if (!options2) {
      options2 = {};
    }
    this.type = "default";
    this.status = options2.status === void 0 ? 200 : options2.status;
    if (this.status < 200 || this.status > 599) {
      throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
    }
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options2.statusText === void 0 ? "" : "" + options2.statusText;
    this.headers = new Headers(options2.headers);
    this.url = options2.url || "";
    this._initBody(bodyInit);
  }
  Body.call(Response.prototype);
  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };
  Response.error = function() {
    var response = new Response(null, { status: 200, statusText: "" });
    response.ok = false;
    response.status = 0;
    response.type = "error";
    return response;
  };
  var redirectStatuses = [301, 302, 303, 307, 308];
  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError("Invalid status code");
    }
    return new Response(null, { status, headers: { location: url } });
  };
  var DOMException = g.DOMException;
  try {
    new DOMException();
  } catch (err) {
    DOMException = function(message, name2) {
      this.message = message;
      this.name = name2;
      var error = Error(message);
      this.stack = error.stack;
    };
    DOMException.prototype = Object.create(Error.prototype);
    DOMException.prototype.constructor = DOMException;
  }
  function fetch2(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);
      if (request.signal && request.signal.aborted) {
        return reject(new DOMException("Aborted", "AbortError"));
      }
      var xhr = new XMLHttpRequest();
      function abortXhr() {
        xhr.abort();
      }
      xhr.onload = function() {
        var options2 = {
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || "")
        };
        if (request.url.indexOf("file://") === 0 && (xhr.status < 200 || xhr.status > 599)) {
          options2.status = 200;
        } else {
          options2.status = xhr.status;
        }
        options2.url = "responseURL" in xhr ? xhr.responseURL : options2.headers.get("X-Request-URL");
        var body = "response" in xhr ? xhr.response : xhr.responseText;
        setTimeout(function() {
          resolve(new Response(body, options2));
        }, 0);
      };
      xhr.onerror = function() {
        setTimeout(function() {
          reject(new TypeError("Network request failed"));
        }, 0);
      };
      xhr.ontimeout = function() {
        setTimeout(function() {
          reject(new TypeError("Network request timed out"));
        }, 0);
      };
      xhr.onabort = function() {
        setTimeout(function() {
          reject(new DOMException("Aborted", "AbortError"));
        }, 0);
      };
      function fixUrl(url) {
        try {
          return url === "" && g.location.href ? g.location.href : url;
        } catch (e) {
          return url;
        }
      }
      xhr.open(request.method, fixUrl(request.url), true);
      if (request.credentials === "include") {
        xhr.withCredentials = true;
      } else if (request.credentials === "omit") {
        xhr.withCredentials = false;
      }
      if ("responseType" in xhr) {
        if (support.blob) {
          xhr.responseType = "blob";
        } else if (support.arrayBuffer) {
          xhr.responseType = "arraybuffer";
        }
      }
      if (init && typeof init.headers === "object" && !(init.headers instanceof Headers || g.Headers && init.headers instanceof g.Headers)) {
        var names = [];
        Object.getOwnPropertyNames(init.headers).forEach(function(name2) {
          names.push(normalizeName(name2));
          xhr.setRequestHeader(name2, normalizeValue(init.headers[name2]));
        });
        request.headers.forEach(function(value, name2) {
          if (names.indexOf(name2) === -1) {
            xhr.setRequestHeader(name2, value);
          }
        });
      } else {
        request.headers.forEach(function(value, name2) {
          xhr.setRequestHeader(name2, value);
        });
      }
      if (request.signal) {
        request.signal.addEventListener("abort", abortXhr);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            request.signal.removeEventListener("abort", abortXhr);
          }
        };
      }
      xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
    });
  }
  fetch2.polyfill = true;
  if (!g.fetch) {
    g.fetch = fetch2;
    g.Headers = Headers;
    g.Request = Request;
    g.Response = Response;
  }

  // node_modules/ollama/dist/browser.mjs
  var version = "0.5.12";
  var __defProp$1 = Object.defineProperty;
  var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField$1 = (obj, key, value) => {
    __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var ResponseError = class _ResponseError extends Error {
    constructor(error, status_code) {
      super(error);
      this.error = error;
      this.status_code = status_code;
      this.name = "ResponseError";
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, _ResponseError);
      }
    }
  };
  var AbortableAsyncIterator = class {
    constructor(abortController, itr, doneCallback) {
      __publicField$1(this, "abortController");
      __publicField$1(this, "itr");
      __publicField$1(this, "doneCallback");
      this.abortController = abortController;
      this.itr = itr;
      this.doneCallback = doneCallback;
    }
    abort() {
      this.abortController.abort();
    }
    async *[Symbol.asyncIterator]() {
      for await (const message of this.itr) {
        if ("error" in message) {
          throw new Error(message.error);
        }
        yield message;
        if (message.done || message.status === "success") {
          this.doneCallback();
          return;
        }
      }
      throw new Error("Did not receive done or success response in stream.");
    }
  };
  var checkOk = async (response) => {
    if (response.ok) {
      return;
    }
    let message = `Error ${response.status}: ${response.statusText}`;
    let errorData = null;
    if (response.headers.get("content-type")?.includes("application/json")) {
      try {
        errorData = await response.json();
        message = errorData.error || message;
      } catch (error) {
        console.log("Failed to parse error response as JSON");
      }
    } else {
      try {
        console.log("Getting text from response");
        const textResponse = await response.text();
        message = textResponse || message;
      } catch (error) {
        console.log("Failed to get text from error response");
      }
    }
    throw new ResponseError(message, response.status);
  };
  function getPlatform() {
    if (typeof window !== "undefined" && window.navigator) {
      return `${window.navigator.platform.toLowerCase()} Browser/${navigator.userAgent};`;
    } else if (typeof process !== "undefined") {
      return `${process.arch} ${process.platform} Node.js/${process.version}`;
    }
    return "";
  }
  var fetchWithHeaders = async (fetch3, url, options2 = {}) => {
    const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": `ollama-js/${version} (${getPlatform()})`
    };
    if (!options2.headers) {
      options2.headers = {};
    }
    const customHeaders = Object.fromEntries(
      Object.entries(options2.headers).filter(([key]) => !Object.keys(defaultHeaders).some((defaultKey) => defaultKey.toLowerCase() === key.toLowerCase()))
    );
    options2.headers = {
      ...defaultHeaders,
      ...customHeaders
    };
    return fetch3(url, options2);
  };
  var get = async (fetch3, host, options2) => {
    const response = await fetchWithHeaders(fetch3, host, {
      headers: options2?.headers
    });
    await checkOk(response);
    return response;
  };
  var post = async (fetch3, host, data, options2) => {
    const isRecord = (input) => {
      return input !== null && typeof input === "object" && !Array.isArray(input);
    };
    const formattedData = isRecord(data) ? JSON.stringify(data) : data;
    const response = await fetchWithHeaders(fetch3, host, {
      method: "POST",
      body: formattedData,
      signal: options2?.signal,
      headers: options2?.headers
    });
    await checkOk(response);
    return response;
  };
  var del = async (fetch3, host, data, options2) => {
    const response = await fetchWithHeaders(fetch3, host, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: options2?.headers
    });
    await checkOk(response);
    return response;
  };
  var parseJSON = async function* (itr) {
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    const reader = itr.getReader();
    while (true) {
      const { done, value: chunk } = await reader.read();
      if (done) {
        break;
      }
      buffer += decoder.decode(chunk);
      const parts = buffer.split("\n");
      buffer = parts.pop() ?? "";
      for (const part of parts) {
        try {
          yield JSON.parse(part);
        } catch (error) {
          console.warn("invalid json: ", part);
        }
      }
    }
    for (const part of buffer.split("\n").filter((p) => p !== "")) {
      try {
        yield JSON.parse(part);
      } catch (error) {
        console.warn("invalid json: ", part);
      }
    }
  };
  var formatHost = (host) => {
    if (!host) {
      return "http://127.0.0.1:11434";
    }
    let isExplicitProtocol = host.includes("://");
    if (host.startsWith(":")) {
      host = `http://127.0.0.1${host}`;
      isExplicitProtocol = true;
    }
    if (!isExplicitProtocol) {
      host = `http://${host}`;
    }
    const url = new URL(host);
    let port = url.port;
    if (!port) {
      if (!isExplicitProtocol) {
        port = "11434";
      } else {
        port = url.protocol === "https:" ? "443" : "80";
      }
    }
    let formattedHost = `${url.protocol}//${url.hostname}:${port}${url.pathname}`;
    if (formattedHost.endsWith("/")) {
      formattedHost = formattedHost.slice(0, -1);
    }
    return formattedHost;
  };
  var __defProp2 = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var Ollama$1 = class Ollama {
    constructor(config) {
      __publicField(this, "config");
      __publicField(this, "fetch");
      __publicField(this, "ongoingStreamedRequests", []);
      this.config = {
        host: "",
        headers: config?.headers
      };
      if (!config?.proxy) {
        this.config.host = formatHost(config?.host ?? "http://127.0.0.1:11434");
      }
      this.fetch = config?.fetch ?? fetch;
    }
    // Abort any ongoing streamed requests to Ollama
    abort() {
      for (const request of this.ongoingStreamedRequests) {
        request.abort();
      }
      this.ongoingStreamedRequests.length = 0;
    }
    /**
     * Processes a request to the Ollama server. If the request is streamable, it will return a
     * AbortableAsyncIterator that yields the response messages. Otherwise, it will return the response
     * object.
     * @param endpoint {string} - The endpoint to send the request to.
     * @param request {object} - The request object to send to the endpoint.
     * @protected {T | AbortableAsyncIterator<T>} - The response object or a AbortableAsyncIterator that yields
     * response messages.
     * @throws {Error} - If the response body is missing or if the response is an error.
     * @returns {Promise<T | AbortableAsyncIterator<T>>} - The response object or a AbortableAsyncIterator that yields the streamed response.
     */
    async processStreamableRequest(endpoint, request) {
      request.stream = request.stream ?? false;
      const host = `${this.config.host}/api/${endpoint}`;
      if (request.stream) {
        const abortController = new AbortController();
        const response2 = await post(this.fetch, host, request, {
          signal: abortController.signal,
          headers: this.config.headers
        });
        if (!response2.body) {
          throw new Error("Missing body");
        }
        const itr = parseJSON(response2.body);
        const abortableAsyncIterator = new AbortableAsyncIterator(
          abortController,
          itr,
          () => {
            const i = this.ongoingStreamedRequests.indexOf(abortableAsyncIterator);
            if (i > -1) {
              this.ongoingStreamedRequests.splice(i, 1);
            }
          }
        );
        this.ongoingStreamedRequests.push(abortableAsyncIterator);
        return abortableAsyncIterator;
      }
      const response = await post(this.fetch, host, request, {
        headers: this.config.headers
      });
      return await response.json();
    }
    /**
     * Encodes an image to base64 if it is a Uint8Array.
     * @param image {Uint8Array | string} - The image to encode.
     * @returns {Promise<string>} - The base64 encoded image.
     */
    async encodeImage(image) {
      if (typeof image !== "string") {
        const uint8Array = new Uint8Array(image);
        let byteString = "";
        const len = uint8Array.byteLength;
        for (let i = 0; i < len; i++) {
          byteString += String.fromCharCode(uint8Array[i]);
        }
        return btoa(byteString);
      }
      return image;
    }
    /**
     * Generates a response from a text prompt.
     * @param request {GenerateRequest} - The request object.
     * @returns {Promise<GenerateResponse | AbortableAsyncIterator<GenerateResponse>>} - The response object or
     * an AbortableAsyncIterator that yields response messages.
     */
    async generate(request) {
      if (request.images) {
        request.images = await Promise.all(request.images.map(this.encodeImage.bind(this)));
      }
      return this.processStreamableRequest("generate", request);
    }
    /**
     * Chats with the model. The request object can contain messages with images that are either
     * Uint8Arrays or base64 encoded strings. The images will be base64 encoded before sending the
     * request.
     * @param request {ChatRequest} - The request object.
     * @returns {Promise<ChatResponse | AbortableAsyncIterator<ChatResponse>>} - The response object or an
     * AbortableAsyncIterator that yields response messages.
     */
    async chat(request) {
      if (request.messages) {
        for (const message of request.messages) {
          if (message.images) {
            message.images = await Promise.all(
              message.images.map(this.encodeImage.bind(this))
            );
          }
        }
      }
      return this.processStreamableRequest("chat", request);
    }
    /**
     * Creates a new model from a stream of data.
     * @param request {CreateRequest} - The request object.
     * @returns {Promise<ProgressResponse | AbortableAsyncIterator<ProgressResponse>>} - The response object or a stream of progress responses.
     */
    async create(request) {
      return this.processStreamableRequest("create", {
        ...request
      });
    }
    /**
     * Pulls a model from the Ollama registry. The request object can contain a stream flag to indicate if the
     * response should be streamed.
     * @param request {PullRequest} - The request object.
     * @returns {Promise<ProgressResponse | AbortableAsyncIterator<ProgressResponse>>} - The response object or
     * an AbortableAsyncIterator that yields response messages.
     */
    async pull(request) {
      return this.processStreamableRequest("pull", {
        name: request.model,
        stream: request.stream,
        insecure: request.insecure
      });
    }
    /**
     * Pushes a model to the Ollama registry. The request object can contain a stream flag to indicate if the
     * response should be streamed.
     * @param request {PushRequest} - The request object.
     * @returns {Promise<ProgressResponse | AbortableAsyncIterator<ProgressResponse>>} - The response object or
     * an AbortableAsyncIterator that yields response messages.
     */
    async push(request) {
      return this.processStreamableRequest("push", {
        name: request.model,
        stream: request.stream,
        insecure: request.insecure
      });
    }
    /**
     * Deletes a model from the server. The request object should contain the name of the model to
     * delete.
     * @param request {DeleteRequest} - The request object.
     * @returns {Promise<StatusResponse>} - The response object.
     */
    async delete(request) {
      await del(
        this.fetch,
        `${this.config.host}/api/delete`,
        { name: request.model },
        { headers: this.config.headers }
      );
      return { status: "success" };
    }
    /**
     * Copies a model from one name to another. The request object should contain the name of the
     * model to copy and the new name.
     * @param request {CopyRequest} - The request object.
     * @returns {Promise<StatusResponse>} - The response object.
     */
    async copy(request) {
      await post(this.fetch, `${this.config.host}/api/copy`, { ...request }, {
        headers: this.config.headers
      });
      return { status: "success" };
    }
    /**
     * Lists the models on the server.
     * @returns {Promise<ListResponse>} - The response object.
     * @throws {Error} - If the response body is missing.
     */
    async list() {
      const response = await get(this.fetch, `${this.config.host}/api/tags`, {
        headers: this.config.headers
      });
      return await response.json();
    }
    /**
     * Shows the metadata of a model. The request object should contain the name of the model.
     * @param request {ShowRequest} - The request object.
     * @returns {Promise<ShowResponse>} - The response object.
     */
    async show(request) {
      const response = await post(this.fetch, `${this.config.host}/api/show`, {
        ...request
      }, {
        headers: this.config.headers
      });
      return await response.json();
    }
    /**
     * Embeds text input into vectors.
     * @param request {EmbedRequest} - The request object.
     * @returns {Promise<EmbedResponse>} - The response object.
     */
    async embed(request) {
      const response = await post(this.fetch, `${this.config.host}/api/embed`, {
        ...request
      }, {
        headers: this.config.headers
      });
      return await response.json();
    }
    /**
     * Embeds a text prompt into a vector.
     * @param request {EmbeddingsRequest} - The request object.
     * @returns {Promise<EmbeddingsResponse>} - The response object.
     */
    async embeddings(request) {
      const response = await post(this.fetch, `${this.config.host}/api/embeddings`, {
        ...request
      }, {
        headers: this.config.headers
      });
      return await response.json();
    }
    /**
     * Lists the running models on the server
     * @returns {Promise<ListResponse>} - The response object.
     * @throws {Error} - If the response body is missing.
     */
    async ps() {
      const response = await get(this.fetch, `${this.config.host}/api/ps`, {
        headers: this.config.headers
      });
      return await response.json();
    }
  };
  var browser = new Ollama$1();

  // assets/js/pages/chat_app.js
  var ChatApplication = class {
    constructor(config = {}) {
      this.config = {
        database: {
          name: "chatHistoryDB",
          version: 1
        },
        stores: {
          sessions: {
            name: "sessions",
            options: { keyPath: "sessionId", autoIncrement: false },
            indexes: [
              { name: "updateTime", keyPath: "updateTime", options: { unique: false } },
              { name: "title", keyPath: "title", options: { unique: false } }
            ]
          },
          conversations: {
            name: "conversations",
            options: { keyPath: "sessionId", autoIncrement: false }
          }
        },
        ai: {
          system: `
          You are a friendly AI assistant. Follow the user's vibe, and if needed, do role play.
          Your responses should be helpful, informative, and engaging.
          You can use markdown to format your responses.
          The current date and time is: ${(/* @__PURE__ */ new Date()).toLocaleString(void 0, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "long"
          })}.
        `,
          options: {}
        },
        ...config
      };
      this.db = new IDB(
        this.config.database.name,
        this.config.database.version,
        this.upgradeDatabase.bind(this)
      );
      this.sessionId = 0;
      this.context = [];
      this.maxContext = 20;
      this.aiOptions = {};
      this.systemPrompt = this.config.ai.system;
      this.model = "";
      this.modelList = [];
      this.editMode = null;
      this.initializeUIElements();
      this.registerEventListeners();
      if (!localStorage.getItem("chatDB")) {
        this.initializeDatabase();
      }
      this.initializeChat();
    }
    /* ================================
       Database and Storage Methods
       ================================ */
    upgradeDatabase(db, oldVersion, newVersion) {
      console.log(`Upgrading database from version ${oldVersion} to ${newVersion}...`);
      const { stores } = this.config;
      Object.values(stores).forEach((storeConfig) => {
        const { name: name2, options: options2, indexes } = storeConfig;
        if (!db.objectStoreNames.contains(name2)) {
          const objectStore = db.createObjectStore(name2, options2);
          indexes?.forEach(({ name: name3, keyPath, options: options3 }) => {
            objectStore.createIndex(name3, keyPath, options3);
          });
          console.log(`Created store: ${name2}`);
        }
      });
    }
    async initializeDatabase() {
      try {
        await this.db.open();
        localStorage.setItem("chatDB", true);
        console.log("Database initialized successfully!");
      } catch (error) {
        localStorage.setItem("chatDB", false);
        console.error("Database initialization failed:", error);
      }
    }
    async addMessageToDatabase(sessionId, message) {
      try {
        const conversation = await this.db.get(this.config.stores.conversations.name, sessionId);
        const sessionInfo = await this.db.get(this.config.stores.sessions.name, sessionId);
        conversation.messages.push(message);
        sessionInfo.updateTime = Date.now();
        await this.db.put(this.config.stores.conversations.name, conversation);
        await this.db.put(this.config.stores.sessions.name, sessionInfo);
        console.log(`Message added successfully to conversation: ${sessionId}`);
      } catch (error) {
        console.error(`Error adding message to conversation: ${error.message}`);
      }
    }
    async getRecentItems(storeName, count = 10, indexName) {
      try {
        const store = await this.db.store(storeName);
        const index = indexName ? store.index(indexName) : null;
        return new Promise((resolve, reject) => {
          const results = [];
          let counter = 0;
          const request = index ? index.openCursor(null, "prev") : store.openCursor(null, "prev");
          request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor && counter < count) {
              results.push(cursor.value);
              counter++;
              cursor.continue();
            } else {
              resolve(results);
            }
          };
          request.onerror = (event) => {
            console.error("Error getting recent items:", event.target.error);
            reject(event.target.error);
          };
        });
      } catch (error) {
        console.error("Error in getRecentItems:", error);
        throw error;
      }
    }
    /* ================================
       UI Initialization & Event Binding
       ================================ */
    initializeUIElements(options2) {
      this.root = document.querySelector("#chat-app-root");
      if (!this.root) throw new Error("Root element not found");
      this.uiOptions = {
        sidebarTogglers: ".sidebar-toggler",
        textarea: "#chat-massage",
        sendButton: "#chat-send-button",
        newChatButton: "#new-chat-button",
        chatHistoryContainer: "#chat-history-container",
        contentScrollContainer: "#content-scroll-container",
        contentContainer: "#content-container",
        modelMenu: "#model-menu",
        sidebarStateName: "chat-sidebar-open",
        backdrop: ".chat-backdrop",
        ...options2
      };
      this.sidebarTogglers = this.root.querySelectorAll(this.uiOptions.sidebarTogglers);
      this.textarea = this.root.querySelector(this.uiOptions.textarea);
      this.sendButton = this.root.querySelector(this.uiOptions.sendButton);
      this.newChatButton = this.root.querySelector(this.uiOptions.newChatButton);
      this.chatHistoryContainer = this.root.querySelector(this.uiOptions.chatHistoryContainer);
      this.contentScrollContainer = this.root.querySelector(this.uiOptions.contentScrollContainer);
      this.contentContainer = this.root.querySelector(this.uiOptions.contentContainer);
      this.modelMenu = this.root.querySelector(this.uiOptions.modelMenu);
    }
    registerEventListeners() {
      this.sidebarTogglers.forEach((toggler) => {
        toggler.addEventListener("click", () => {
          try {
            this.toggleSidebar();
          } catch (error) {
            console.error("Error toggling sidebar:", error);
          }
        });
      });
      const sidebarIsOpen = localStorage.getItem(this.uiOptions.sidebarStateName) === "true";
      if (sidebarIsOpen) this.root.classList.add("sidebar-open");
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.root.classList.contains("sidebar-open")) {
          try {
            this.toggleSidebar();
          } catch (error) {
            console.error("Error handling Escape key:", error);
          }
        }
      });
      this.sendButton.addEventListener("click", async () => {
        await this.processChat();
      });
      this.textarea.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.processChat();
        }
      });
      this.chatHistoryContainer.addEventListener("click", (e) => {
        try {
          this.displayChatHistory(e.target);
        } catch (error) {
          console.error("Error showing chat history:", error);
        }
      });
      this.newChatButton.addEventListener("click", () => {
        this.startNewChat();
      });
      this.modelMenu.addEventListener("click", (e) => {
        this.selectModel(e.target);
      });
      window.addEventListener("offline", () => this.updateNetworkStatus());
      window.addEventListener("online", () => this.updateNetworkStatus());
      document.addEventListener("DOMContentLoaded", () => {
        this.updateNetworkStatus();
        this.root.classList.add("loaded");
      });
      this.contentContainer.addEventListener("click", (e) => {
        const editButton = e.target.closest(".action__button.edit");
        if (editButton) {
          const messageBlock = editButton.closest(".chat__block");
          this.enableEditMode(messageBlock);
        }
      });
    }
    toggleSidebar() {
      try {
        const isOpen = this.root.classList.toggle("sidebar-open");
        localStorage.setItem(this.uiOptions.sidebarStateName, isOpen);
        let backdrop = this.root.querySelector(this.uiOptions.backdrop);
        if (!backdrop && isOpen) {
          backdrop = document.createElement("backdrop");
          backdrop.classList.add("chat-backdrop");
          backdrop.addEventListener("click", () => this.toggleSidebar());
          this.root.appendChild(backdrop);
        }
        if (backdrop) {
          backdrop.classList.toggle("open");
        }
      } catch (error) {
        console.error("Error in toggleSidebar:", error);
      }
    }
    updateNetworkStatus() {
      this.root.classList.toggle("offline", !navigator.onLine);
    }
    /* ================================
       UI Rendering Methods
       ================================ */
    sanitizeInput(input) {
      return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
    renderMessage(content, role) {
      const finalContent = role === "user" ? this.sanitizeInput(content) : content;
      const messageHTML = this.generateMessageBlock(finalContent, role);
      this.contentContainer.insertAdjacentHTML("beforeend", messageHTML);
    }
    addChatHistoryItem(title, sessionId, position = "beforeend") {
      this.chatHistoryContainer.insertAdjacentHTML(
        position,
        `<button class="item" data-session-id="${sessionId}">${title}</button>`
      );
    }
    generateMessageBlock(content, role) {
      switch (role) {
        case "user":
          return `<div class="chat__block user" data-role="${role}">
                  <div class="actions__wrapper">
                    <button class="action__button edit" title="Edit message">
                      <svg class="icon">
                        <use href="#edit-icon" />
                      </svg>
                    </button>
                  </div>
                  <span class="message">${content}</span>
                </div>`;
        case "assistant":
          return `<div class="chat__block assistant" data-role="${role}">
                  <svg class="icon assistant__logo">
                    <use href="#stars-icon" />
                  </svg>
                  <div class="response_wrapper">
                    <div class="response">
                      ${content}
                    </div>
                    <div class="actions__wrapper">
                      <button class="action__button copy" title="Copy message">
                        <svg class="icon">
                          <use href="#copy-icon" />
                        </svg>
                      </button>
                      <button class="action__button repeat" title="Regenerate response">
                        <svg class="icon">
                          <use href="#repeat-icon" />
                        </svg>
                      </button>
                      <button class="action__button like" title="Good response">
                        <svg class="icon">
                          <use href="#like-icon" />
                        </svg>
                      </button>
                      <button class="action__button dislike" title="Bad response">
                        <svg class="icon">
                          <use href="#dislike-icon" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>`;
        case "system":
          return `<div class="chat__block system">
                  ${content} 
                </div>`;
        default:
          return "";
      }
    }
    scrollToBottom() {
      this.contentScrollContainer.scrollTo({
        top: this.contentScrollContainer.scrollHeight,
        behavior: "smooth"
      });
    }
    /* ================================
       Message Editing Methods
       ================================ */
    enableEditMode(messageBlock) {
      if (this.editMode) return;
      const messageSpan = messageBlock.querySelector(".message");
      const originalText = messageSpan.textContent;
      const editUI = `
      <div class="edit__wrapper">
        <textarea class="edit-textarea">${originalText}</textarea>
        <div class="edit__actions">
          <button class="dark r save-edit">Save</button>
          <button class="r cancel-edit">Cancel</button>
        </div> 
      </div>
    `;
      messageBlock.classList.add("editing");
      messageBlock.insertAdjacentHTML("beforeend", editUI);
      const textarea = messageBlock.querySelector(".edit-textarea");
      textarea.focus();
      this.editMode = {
        block: messageBlock,
        messageSpan,
        original: originalText,
        textarea
      };
      messageBlock.querySelector(".save-edit").addEventListener("click", () => this.saveEdit());
      messageBlock.querySelector(".cancel-edit").addEventListener("click", () => this.cancelEdit());
      textarea.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.saveEdit();
        }
        if (e.key === "Escape") {
          this.cancelEdit();
        }
      });
    }
    saveEdit() {
      if (!this.editMode) return;
      const newText = this.editMode.textarea.value.trim();
      if (newText && newText !== this.editMode.original) {
        this.editMode.messageSpan.textContent = newText;
      }
      this.exitEditMode();
    }
    cancelEdit() {
      if (!this.editMode) return;
      this.exitEditMode();
    }
    exitEditMode() {
      if (!this.editMode) return;
      this.editMode.block.classList.remove("editing");
      const editUI = this.editMode.block.querySelector(".edit__wrapper");
      if (editUI) editUI.remove();
      this.editMode = null;
    }
    /* ================================
       Chat Logic Methods
       ================================ */
    async processChat() {
      try {
        const userContent = this.textarea.value.trim();
        this.textarea.value = "";
        if (!userContent) return;
        const isNewSession = !this.root.hasAttribute("data-session-id");
        if (isNewSession) {
          await this.createNewSession();
          this.addChatHistoryItem(`New Chat ${this.sessionId}`, this.sessionId, "afterbegin");
        }
        this.root.classList.remove("initial");
        this.renderMessage(userContent, "user");
        this.renderMessage("", "assistant");
        this.scrollToBottom();
        await this.addMessageToDatabase(this.sessionId, { role: "user", content: userContent });
        this.context.push({ role: "user", content: userContent });
        const lastAssistantBlock = this.contentContainer.querySelector(
          ".chat__block.assistant:last-child .response_wrapper .response"
        );
        const responseStream = await browser.chat({
          model: this.model,
          messages: [
            { role: "system", content: this.systemPrompt },
            ...this.context
          ],
          options: this.aiOptions,
          stream: true
        });
        let assistantContent = "";
        for await (const part of responseStream) {
          assistantContent += part.message.content;
          lastAssistantBlock.innerHTML = marked.parse(assistantContent);
          this.scrollToBottom();
          highlightAll();
        }
        await this.addMessageToDatabase(this.sessionId, { role: "assistant", content: assistantContent });
        this.context.push({ role: "assistant", content: assistantContent });
        if (isNewSession) {
          const titleResponse = await browser.chat({
            model: this.model,
            messages: [
              {
                role: "system",
                content: "You are an AI assistant. Generate a concise, engaging title under 6 words that reflects the core intent of the user's first message, from their perspective. The title should summarize the query clearly to aid in future searchability. Respond *only* with the title\u2014no explanations."
              },
              {
                role: "user",
                content: `Generate a title for this message: '${userContent}'.`
              }
            ]
          });
          if (titleResponse.message.content) {
            const updatedTitle = titleResponse.message.content.replaceAll('"', "");
            await this.updateChatHistoryTitle(this.sessionId, updatedTitle);
          }
        }
        if (this.context.length >= this.maxContext) {
          await this.refreshContext(this.context, this.maxContext);
        }
        console.log(this.context);
      } catch (error) {
        console.error("Error processing chat:", error);
      }
    }
    startNewChat() {
      this.root.classList.add("initial");
      this.contentContainer.innerHTML = "";
      this.textarea.value = "";
      this.root.removeAttribute("data-session-id");
      this.context = [];
    }
    async createNewSession() {
      try {
        this.sessionId = Number(localStorage.getItem("chatSessions")) || 0;
        this.sessionId += 1;
        this.root.setAttribute("data-session-id", this.sessionId);
        await this.db.add(this.config.stores.conversations.name, { sessionId: this.sessionId, messages: [] });
        await this.db.add(this.config.stores.sessions.name, {
          sessionId: this.sessionId,
          creationTime: Date.now(),
          title: `New Chat ${this.sessionId}`,
          updateTime: Date.now()
        });
        localStorage.setItem("chatSessions", this.sessionId);
      } catch (error) {
        console.error("Error creating new session:", error);
      }
    }
    async updateChatHistoryTitle(sessionId, newTitle) {
      try {
        const historyItem = this.chatHistoryContainer.querySelector(`.item[data-session-id="${sessionId}"]`);
        if (historyItem) {
          historyItem.textContent = newTitle;
        }
        const sessionInfo = await this.db.get(this.config.stores.sessions.name, sessionId);
        sessionInfo.title = newTitle;
        await this.db.put(this.config.stores.sessions.name, sessionInfo);
        console.log(`History item updated: ${newTitle}`);
      } catch (error) {
        console.error("Error updating chat history title:", error);
      }
    }
    async refreshContext(messages, maxCount = 10) {
      try {
        if (messages.length > maxCount) {
          const halfMax = Math.floor(maxCount / 2);
          const firstHalf = messages.filter((msg) => msg.role === "user").slice(0, halfMax);
          const lastHalf = messages.slice(-halfMax);
          this.context = [...firstHalf, ...lastHalf];
        } else if (messages.length) {
          this.context = messages;
        }
      } catch (error) {
        console.error("Error updating context:", error);
      }
    }
    /* ================================
       Chat History and Model Selection
       ================================ */
    async displayChatHistory(target) {
      try {
        const sessionIdAttribute = target.getAttribute("data-session-id");
        if (!sessionIdAttribute) return;
        this.root.classList.remove("initial");
        this.contentContainer.innerHTML = "";
        this.root.setAttribute("data-session-id", sessionIdAttribute);
        this.sessionId = Number(sessionIdAttribute);
        const conversation = await this.db.get(this.config.stores.conversations.name, this.sessionId);
        if (conversation.messages.length) {
          for (const message of conversation.messages) {
            if (message.role === "assistant") {
              this.renderMessage(marked.parse(message.content), message.role);
            } else {
              this.renderMessage(message.content, message.role);
            }
          }
          this.scrollToBottom();
          highlightAll();
          await this.refreshContext(conversation.messages, this.maxContext);
          console.log(this.context);
        }
      } catch (error) {
        console.error("Error displaying chat history:", error);
      }
    }
    selectModel(target) {
      try {
        const selectedModel = target.getAttribute("data-model");
        if (!selectedModel) return;
        localStorage.setItem("selectedModel", selectedModel);
        this.model = selectedModel;
        this.modelMenu.querySelectorAll(".model").forEach((modelBtn) => {
          modelBtn.classList.remove("active");
        });
        this.modelMenu.querySelector(`[data-model="${selectedModel}"]`)?.classList.add("active");
      } catch (error) {
        console.error("Error selecting model:", error);
      }
    }
    /* ================================
       Initialization of Chat and Models
       ================================ */
    async initializeChat() {
      try {
        if (localStorage.getItem("chatDB")) {
          const chatHistoryItems = await this.getRecentItems(this.config.stores.sessions.name, 50, "updateTime");
          if (chatHistoryItems.length) {
            chatHistoryItems.forEach((item) => {
              this.addChatHistoryItem(item.title, item.sessionId);
            });
          }
        }
        const modelListResponse = await browser.list();
        if (modelListResponse.models.length) {
          this.modelList = modelListResponse.models;
          if (!localStorage.getItem("selectedModel")) {
            localStorage.setItem("selectedModel", this.modelList[0].name);
          }
          this.model = localStorage.getItem("selectedModel");
          this.modelList.forEach((model) => {
            const [modelName, modelInfo] = model.name.split(":");
            this.modelMenu.insertAdjacentHTML("beforeend", `
            <button class="model" data-model="${model.name}">
              <span class="name">${modelName}</span>
              <span class="info">${modelInfo || ""}</span>
            </button>
          `);
          });
          this.modelMenu.querySelector(`[data-model="${this.model}"]`)?.classList.add("active");
        } else {
          console.error("At least one model is required");
        }
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    }
    /* ================================
       Optional: Window Controls Overlay
       ================================ */
    initWindowControls() {
      if ("windowControlsOverlay" in navigator) {
        const updateTitlebarArea = (e) => {
          try {
            const isOverlayVisible = navigator.windowControlsOverlay.visible;
            const { x, y, width, height } = e?.titlebarAreaRect || navigator.windowControlsOverlay.getTitlebarAreaRect();
            this.root.style.setProperty("--title-bar-height", `${height}px`);
            this.root.style.setProperty("--title-bar-width", `${width}px`);
            this.root.style.setProperty("--title-bar-x", `${x}px`);
            this.root.style.setProperty("--title-bar-y", `${y}px`);
            this.root.classList.toggle("overlay-visible", isOverlayVisible);
          } catch (error) {
            console.error("Error updating titlebar area:", error);
          }
        };
        navigator.windowControlsOverlay.addEventListener("geometrychange", updateTitlebarArea);
        updateTitlebarArea();
      }
    }
  };
  var chatApp = new ChatApplication();
})();
