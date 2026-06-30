/* @ds-bundle: {"format":3,"namespace":"CobaltMidnightDesignSystem_f8c3dc","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"FundingProgress","sourcePath":"components/fintech/FundingProgress.jsx"},{"name":"InvestorCount","sourcePath":"components/fintech/InvestorCount.jsx"},{"name":"MetaBadge","sourcePath":"components/fintech/MetaBadge.jsx"},{"name":"MilestoneTimeline","sourcePath":"components/fintech/MilestoneTimeline.jsx"},{"name":"MoneyAmount","sourcePath":"components/fintech/MoneyAmount.jsx"},{"name":"RiskBadge","sourcePath":"components/fintech/RiskBadge.jsx"},{"name":"RiskDisclosureCard","sourcePath":"components/fintech/RiskDisclosureCard.jsx"},{"name":"StatusBadge","sourcePath":"components/fintech/StatusBadge.jsx"},{"name":"TrustBadge","sourcePath":"components/fintech/TrustBadge.jsx"},{"name":"Wallet","sourcePath":"components/fintech/Wallet.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"SidebarItem","sourcePath":"components/navigation/SidebarItem.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"4616141d10aa","components/core/Badge.jsx":"a600c741a876","components/core/Button.jsx":"3499a735334a","components/core/Card.jsx":"80da615b1395","components/core/Chip.jsx":"5a0abd928cbc","components/fintech/FundingProgress.jsx":"a8e42b6b4677","components/fintech/InvestorCount.jsx":"94c523ef7e38","components/fintech/MetaBadge.jsx":"99c6ef015c0e","components/fintech/MilestoneTimeline.jsx":"b8fd21914754","components/fintech/MoneyAmount.jsx":"bd988b2865d3","components/fintech/RiskBadge.jsx":"a3317a442826","components/fintech/RiskDisclosureCard.jsx":"bd79bb09872a","components/fintech/StatusBadge.jsx":"0ab7286e9f60","components/fintech/TrustBadge.jsx":"a158e6726a92","components/fintech/Wallet.jsx":"cde61d8039b6","components/forms/Input.jsx":"e1945bf51da7","components/forms/Switch.jsx":"cce3341f1fee","components/navigation/SidebarItem.jsx":"bb39477c6750","components/navigation/Tabs.jsx":"81ef04519d98","ui_kits/dashboard/Overview.jsx":"a5245065d594","ui_kits/dashboard/Sidebar.jsx":"2bafa61629e6","ui_kits/dashboard/TopBar.jsx":"b324d9c67b89"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CobaltMidnightDesignSystem_f8c3dc = window.CobaltMidnightDesignSystem_f8c3dc || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar — circular identity token. Renders an image if `src` is given,
 * otherwise initials on a graphite fill.
 */
function Avatar({
  src,
  name = "",
  size = 32,
  style = {},
  ...rest
}) {
  const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: size,
      height: size,
      borderRadius: "var(--radius-full)",
      backgroundColor: "var(--color-surface-elevated)",
      border: "1px solid var(--color-border)",
      color: "var(--color-on-surface)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      font: "var(--type-label-sm)",
      fontWeight: 600,
      overflow: "hidden",
      flexShrink: 0,
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: Math.round(size * 0.36)
    }
  }, initials || "?"));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small status pill. `success` / `warning` / `error` use pale status
 * fills with dark ink text; `neutral` is a quiet graphite tag.
 */
function Badge({
  children,
  variant = "neutral",
  style = {},
  ...rest
}) {
  const variants = {
    neutral: {
      backgroundColor: "var(--color-tertiary)",
      color: "var(--color-on-surface)"
    },
    success: {
      backgroundColor: "var(--color-success)",
      color: "var(--color-primary)"
    },
    warning: {
      backgroundColor: "var(--color-warning)",
      color: "var(--color-primary)"
    },
    error: {
      backgroundColor: "var(--color-error)",
      color: "var(--color-primary)"
    },
    accent: {
      backgroundColor: "rgba(11,132,255,0.16)",
      color: "var(--color-accent)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      font: "var(--type-label-sm)",
      fontWeight: 500,
      borderRadius: "var(--radius-sm)",
      padding: "4px 6px",
      whiteSpace: "nowrap",
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — Cobalt Midnight's understated, compact action control.
 * Pills for primary/secondary, borderless link for low-emphasis text actions.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  onClick,
  type = "button",
  style = {},
  ...rest
}) {
  const heights = {
    sm: 32,
    md: 40,
    lg: 48
  };
  const pads = {
    sm: "8px 14px",
    md: "12px 19px",
    lg: "14px 24px"
  };
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    font: "var(--type-body-sm)",
    fontWeight: 500,
    height: heights[size],
    padding: variant === "link" ? 0 : pads[size],
    borderRadius: variant === "link" ? "var(--radius-none)" : "var(--radius-full)",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    whiteSpace: "nowrap",
    transition: "background-color .15s ease, color .15s ease, border-color .15s ease",
    boxSizing: "border-box",
    textDecoration: "none",
    outline: "none"
  };
  const variants = {
    primary: {
      backgroundColor: "var(--color-primary)",
      color: "var(--color-secondary)",
      borderColor: "var(--color-border)"
    },
    accent: {
      backgroundColor: "var(--color-accent)",
      color: "var(--text-on-accent)",
      borderColor: "var(--color-accent)"
    },
    secondary: {
      backgroundColor: "transparent",
      color: "var(--color-secondary)",
      borderColor: "var(--color-border)"
    },
    link: {
      backgroundColor: "transparent",
      color: "var(--color-secondary)",
      borderColor: "transparent",
      height: "auto"
    }
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyle = !disabled && hover ? {
    primary: {
      backgroundColor: "var(--color-primary-60)",
      color: "var(--color-on-surface)"
    },
    accent: {
      backgroundColor: "color-mix(in srgb, var(--color-accent) 84%, #000)",
      borderColor: "color-mix(in srgb, var(--color-accent) 84%, #000)"
    },
    secondary: {
      backgroundColor: "var(--color-tertiary)",
      color: "var(--color-on-surface)"
    },
    link: {
      color: "var(--color-on-surface)"
    }
  }[variant] : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...variants[variant],
      ...hoverStyle,
      ...style
    }
  }, rest), leadingIcon, children, trailingIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — graphite surface with a soft inset border and almost no shadow.
 * Holds dashboard metrics, summaries, and modules at high data density.
 */
function Card({
  children,
  padding = 12,
  interactive = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      backgroundColor: "var(--color-neutral)",
      color: "var(--color-on-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-md)",
      padding,
      boxShadow: "var(--shadow-subtle)",
      transition: "border-color .15s ease, background-color .15s ease",
      ...(interactive && hover ? {
        borderColor: "var(--color-muted-border)",
        cursor: "pointer"
      } : {}),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Chip — low-key rounded pill for filters, tags, and metadata.
 * Optional `selected` state borrows the accent-blue signal.
 */
function Chip({
  children,
  selected = false,
  onClick,
  leadingIcon = null,
  style = {},
  ...rest
}) {
  const interactive = typeof onClick === "function";
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    role: interactive ? "button" : undefined,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      font: "var(--type-label-sm)",
      fontWeight: 500,
      color: selected ? "var(--color-accent)" : "var(--color-on-surface)",
      backgroundColor: selected ? "rgba(11,132,255,0.14)" : "var(--color-tertiary)",
      border: `1px solid ${selected ? "rgba(11,132,255,0.5)" : "transparent"}`,
      borderRadius: "var(--radius-full)",
      padding: "6px 10px",
      cursor: interactive ? "pointer" : "default",
      whiteSpace: "nowrap",
      transition: "background-color .15s ease, color .15s ease, border-color .15s ease",
      ...style
    }
  }, rest), leadingIcon, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/fintech/FundingProgress.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FundingProgress — raised-vs-goal funding bar for a project/offering.
 * Accent fill on an elevated track; compact figures above, goal below.
 */
function FundingProgress({
  raised = 0,
  goal = 1,
  currency = "₱",
  percent,
  showLabels = true,
  height = 8,
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, percent ?? (goal > 0 ? raised / goal * 100 : 0)));
  const fmt = n => currency + Number(n).toLocaleString("en-PH", {
    maximumFractionDigits: 0
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      ...style
    }
  }, rest), showLabels && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label-lg)",
      color: "var(--color-on-surface)",
      fontVariantNumeric: "tabular-nums"
    }
  }, fmt(raised)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label-sm)",
      color: "var(--color-accent)",
      fontWeight: 600,
      fontVariantNumeric: "tabular-nums"
    }
  }, pct.toFixed(0), "%")), /*#__PURE__*/React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": Math.round(pct),
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    style: {
      position: "relative",
      height,
      borderRadius: "var(--radius-full)",
      backgroundColor: "var(--color-surface-elevated)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      right: "auto",
      width: pct + "%",
      backgroundColor: "var(--color-accent)",
      borderRadius: "var(--radius-full)",
      transition: "width .4s cubic-bezier(.4,0,.2,1)"
    }
  })), showLabels && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 12,
      font: "var(--type-label-sm)",
      color: "var(--color-secondary)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Raised"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: "tabular-nums"
    }
  }, "Goal ", fmt(goal))));
}
Object.assign(__ds_scope, { FundingProgress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fintech/FundingProgress.jsx", error: String((e && e.message) || e) }); }

// components/fintech/InvestorCount.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * InvestorCount — investors icon + count, for project cards and headers.
 * Compact inline by default; set `showLabel` to append "investors".
 */
function InvestorCount({
  count = 0,
  showLabel = true,
  size = 15,
  style = {},
  ...rest
}) {
  const formatted = Number(count).toLocaleString("en-PH");
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      font: "var(--type-label-md)",
      color: "var(--color-secondary)",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 21v-2a4 4 0 0 0-3-3.87"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-on-surface)",
      fontWeight: 500,
      fontVariantNumeric: "tabular-nums"
    }
  }, formatted), showLabel && /*#__PURE__*/React.createElement("span", null, "investors"));
}
Object.assign(__ds_scope, { InvestorCount });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fintech/InvestorCount.jsx", error: String((e && e.message) || e) }); }

// components/fintech/MetaBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Glyph({
  paths,
  size = 13
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0
    },
    "aria-hidden": "true"
  }, paths);
}
const PIN = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "10",
  r: "3"
}));
const TAG = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "7.5",
  cy: "7.5",
  r: ".5",
  fill: "currentColor"
}));

/**
 * MetaBadge — quiet metadata pill for a project's location or category.
 * `type="location" | "category"` supplies the glyph; pass a custom `icon` to override.
 */
function MetaBadge({
  type = "location",
  icon,
  children,
  style = {},
  ...rest
}) {
  const glyph = icon ?? (type === "category" ? /*#__PURE__*/React.createElement(Glyph, {
    paths: TAG
  }) : /*#__PURE__*/React.createElement(Glyph, {
    paths: PIN
  }));
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      font: "var(--type-label-sm)",
      fontWeight: 500,
      color: "var(--color-secondary)",
      backgroundColor: "var(--color-tertiary)",
      borderRadius: "var(--radius-full)",
      padding: "4px 10px 4px 8px",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), glyph, children);
}
Object.assign(__ds_scope, { MetaBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fintech/MetaBadge.jsx", error: String((e && e.message) || e) }); }

// components/fintech/MilestoneTimeline.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MilestoneTimeline — vertical (default) or horizontal sequence of project
 * milestones. Each item: { label, date?, status: "done" | "active" | "upcoming" }.
 */
function MilestoneTimeline({
  items = [],
  orientation = "vertical",
  style = {},
  ...rest
}) {
  const vertical = orientation !== "horizontal";
  const node = status => {
    if (status === "done") {
      return /*#__PURE__*/React.createElement("span", {
        style: {
          width: 18,
          height: 18,
          borderRadius: "var(--radius-full)",
          flexShrink: 0,
          backgroundColor: "var(--color-accent)",
          color: "var(--text-on-accent)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }, /*#__PURE__*/React.createElement("svg", {
        width: "11",
        height: "11",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "3",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true"
      }, /*#__PURE__*/React.createElement("path", {
        d: "m5 12 5 5L20 7"
      })));
    }
    const active = status === "active";
    return /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        borderRadius: "var(--radius-full)",
        flexShrink: 0,
        boxSizing: "border-box",
        backgroundColor: active ? "rgba(11,132,255,0.18)" : "var(--color-surface-elevated)",
        border: `2px solid ${active ? "var(--color-accent)" : "var(--color-muted-border)"}`
      }
    });
  };
  const line = filled => filled ? "var(--color-accent)" : "var(--color-muted-border)";
  if (vertical) {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        display: "flex",
        flexDirection: "column",
        ...style
      }
    }, rest), items.map((it, i) => {
      const last = i === items.length - 1;
      const filled = it.status === "done";
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: "flex",
          gap: 12,
          minHeight: last ? "auto" : 44
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }
      }, node(it.status), !last && /*#__PURE__*/React.createElement("span", {
        style: {
          width: 2,
          flex: 1,
          marginTop: 2,
          backgroundColor: line(filled)
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          paddingBottom: last ? 0 : 16
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          font: "var(--type-label-lg)",
          color: it.status === "upcoming" ? "var(--color-secondary)" : "var(--color-on-surface)"
        }
      }, it.label), it.date && /*#__PURE__*/React.createElement("div", {
        style: {
          font: "var(--type-label-sm)",
          color: "var(--color-secondary)",
          marginTop: 2
        }
      }, it.date)));
    }));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      ...style
    }
  }, rest), items.map((it, i) => {
    const last = i === items.length - 1;
    const filled = it.status === "done";
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        flexDirection: "column",
        flex: last ? "0 0 auto" : 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center"
      }
    }, node(it.status), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        height: 2,
        flex: 1,
        marginLeft: 4,
        backgroundColor: line(filled)
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        paddingRight: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--type-label-md)",
        color: it.status === "upcoming" ? "var(--color-secondary)" : "var(--color-on-surface)"
      }
    }, it.label), it.date && /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--type-label-sm)",
        color: "var(--color-secondary)",
        marginTop: 2
      }
    }, it.date)));
  }));
}
Object.assign(__ds_scope, { MilestoneTimeline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fintech/MilestoneTimeline.jsx", error: String((e && e.message) || e) }); }

// components/fintech/MoneyAmount.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MoneyAmount — formats a value as Philippine peso (₱) or a token quantity.
 * Tabular figures, thousands separators, optional sign coloring for deltas.
 */
function MoneyAmount({
  amount = 0,
  kind = "peso",
  symbol,
  size = "md",
  decimals,
  showSign = false,
  tone = "default",
  style = {},
  ...rest
}) {
  const isToken = kind === "token";
  const sym = symbol ?? (isToken ? "AUR" : "₱");
  const dp = decimals ?? (isToken ? 2 : 2);
  const sizes = {
    sm: "var(--type-label-md)",
    md: "var(--type-body-md)",
    lg: "var(--type-headline-sm)",
    display: "var(--type-headline-md)"
  };
  const tones = {
    default: "var(--color-on-surface)",
    muted: "var(--color-secondary)",
    positive: "var(--color-success)",
    negative: "var(--color-error)"
  };
  const n = Math.abs(amount);
  const formatted = n.toLocaleString("en-PH", {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp
  });
  const sign = amount < 0 ? "−" : showSign ? "+" : "";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "baseline",
      gap: isToken ? 5 : 2,
      font: sizes[size],
      color: tones[tone],
      fontVariantNumeric: "tabular-nums",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), isToken ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, sign, formatted), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-secondary)",
      fontWeight: 500,
      fontSize: "0.78em"
    }
  }, sym)) : /*#__PURE__*/React.createElement("span", null, sign, sym, formatted));
}
Object.assign(__ds_scope, { MoneyAmount });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fintech/MoneyAmount.jsx", error: String((e && e.message) || e) }); }

// components/fintech/RiskBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * RiskBadge — risk-level pill with a small 3-bar signal that fills by level.
 * low → success, medium → warning, high / very-high → error.
 */
function RiskBadge({
  level = "medium",
  showLabel = true,
  style = {},
  ...rest
}) {
  const map = {
    low: {
      label: "Low risk",
      fill: "var(--color-success)",
      bars: 1
    },
    medium: {
      label: "Medium risk",
      fill: "var(--color-warning)",
      bars: 2
    },
    high: {
      label: "High risk",
      fill: "var(--color-error)",
      bars: 3
    },
    "very-high": {
      label: "Very high risk",
      fill: "var(--color-error)",
      bars: 3
    }
  };
  const r = map[level] || map.medium;
  return /*#__PURE__*/React.createElement("span", _extends({
    title: r.label,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      font: "var(--type-label-sm)",
      fontWeight: 500,
      color: "var(--color-on-surface)",
      backgroundColor: "var(--color-tertiary)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-full)",
      padding: "4px 10px 4px 8px",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "flex-end",
      gap: 2,
      height: 12
    },
    "aria-hidden": "true"
  }, [5, 8, 11].map((h, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 3,
      height: h,
      borderRadius: 1,
      backgroundColor: i < r.bars ? r.fill : "var(--color-muted-border)"
    }
  }))), showLabel && r.label);
}
Object.assign(__ds_scope, { RiskBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fintech/RiskBadge.jsx", error: String((e && e.message) || e) }); }

// components/fintech/RiskDisclosureCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * RiskDisclosureCard — regulatory risk-disclosure panel. Alert-toned header
 * with an itemized list of disclosures. Falls back to standard fintech points.
 */
function RiskDisclosureCard({
  title = "Risk disclosure",
  points,
  children,
  style = {},
  ...rest
}) {
  const list = points ?? ["Investments are not guaranteed and may lose value.", "Returns are projected, not promised — past performance is not indicative.", "Tokens are non-transferable outside the platform and held in escrow.", "Capital is locked until the offering matures or is redeemed."];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      backgroundColor: "var(--color-neutral)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-md)",
      padding: 16,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: "var(--radius-full)",
      flexShrink: 0,
      backgroundColor: "rgba(253,230,138,0.12)",
      color: "var(--color-warning)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.85",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 9v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 17h.01"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-headline-sm)",
      color: "var(--color-on-surface)"
    }
  }, title)), children ?? /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, list.map((p, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      gap: 8,
      font: "var(--type-body-sm)",
      color: "var(--color-secondary)",
      lineHeight: 1.45
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: "var(--color-warning)",
      marginTop: 1,
      flexShrink: 0
    }
  }, "\u2022"), /*#__PURE__*/React.createElement("span", null, p)))));
}
Object.assign(__ds_scope, { RiskDisclosureCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fintech/RiskDisclosureCard.jsx", error: String((e && e.message) || e) }); }

// components/fintech/StatusBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatusBadge — project / offering lifecycle status with a leading status dot.
 * upcoming · funding · funded · closed · paused.
 */
function StatusBadge({
  status = "funding",
  label,
  style = {},
  ...rest
}) {
  const map = {
    upcoming: {
      label: "Upcoming",
      dot: "var(--color-secondary)",
      text: "var(--color-secondary)"
    },
    funding: {
      label: "Funding",
      dot: "var(--color-accent)",
      text: "var(--color-accent)"
    },
    funded: {
      label: "Funded",
      dot: "var(--color-success)",
      text: "var(--color-success)"
    },
    closed: {
      label: "Closed",
      dot: "var(--color-muted-border)",
      text: "var(--color-secondary)"
    },
    paused: {
      label: "Paused",
      dot: "var(--color-warning)",
      text: "var(--color-warning)"
    }
  };
  const s = map[status] || map.funding;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      font: "var(--type-label-sm)",
      fontWeight: 500,
      color: s.text,
      backgroundColor: "var(--color-surface-elevated)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-full)",
      padding: "4px 10px",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 6,
      height: 6,
      borderRadius: "var(--radius-full)",
      backgroundColor: s.dot,
      boxShadow: status === "funding" ? "0 0 0 3px rgba(11,132,255,0.18)" : "none"
    }
  }), label || s.label);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fintech/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/fintech/TrustBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inline Lucide-style glyphs (1.75 stroke) so the badge is self-contained. */
function Glyph({
  paths,
  size = 14
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0
    },
    "aria-hidden": "true"
  }, paths);
}
const SHIELD_CHECK = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
}), /*#__PURE__*/React.createElement("path", {
  d: "m9 12 2 2 4-4"
}));
const LOCK = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
  width: "18",
  height: "11",
  x: "3",
  y: "11",
  rx: "2",
  ry: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M7 11V7a5 5 0 0 1 10 0v4"
}));
const BADGE_CHECK = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "m9 12 2 2 4-4"
}));
const LANDMARK = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
  x1: "3",
  x2: "21",
  y1: "22",
  y2: "22"
}), /*#__PURE__*/React.createElement("line", {
  x1: "6",
  x2: "6",
  y1: "18",
  y2: "11"
}), /*#__PURE__*/React.createElement("line", {
  x1: "10",
  x2: "10",
  y1: "18",
  y2: "11"
}), /*#__PURE__*/React.createElement("line", {
  x1: "14",
  x2: "14",
  y1: "18",
  y2: "11"
}), /*#__PURE__*/React.createElement("line", {
  x1: "18",
  x2: "18",
  y1: "18",
  y2: "11"
}), /*#__PURE__*/React.createElement("polygon", {
  points: "12 2 20 7 4 7"
}));
const BRACES = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"
}));
const CHAIN = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M9 17H7A5 5 0 0 1 7 7h2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M15 7h2a5 5 0 1 1 0 10h-2"
}), /*#__PURE__*/React.createElement("line", {
  x1: "8",
  x2: "16",
  y1: "12",
  y2: "12"
}));
const BAN = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("path", {
  d: "m4.9 4.9 14.2 14.2"
}));
const TYPES = {
  "kyc-verified": {
    label: "KYC verified",
    glyph: SHIELD_CHECK,
    tone: "positive"
  },
  "escrow-protected": {
    label: "Escrow protected",
    glyph: LOCK,
    tone: "accent"
  },
  "admin-approved": {
    label: "Admin approved",
    glyph: BADGE_CHECK,
    tone: "positive"
  },
  "reserve-backed": {
    label: "Reserve backed",
    glyph: LANDMARK,
    tone: "accent"
  },
  "smart-contract": {
    label: "Smart contract",
    glyph: BRACES,
    tone: "accent"
  },
  blockchain: {
    label: "On-chain",
    glyph: CHAIN,
    tone: "accent"
  },
  "no-guaranteed-return": {
    label: "No guaranteed return",
    glyph: BAN,
    tone: "warning"
  },
  "no-external-transfer": {
    label: "No external transfer",
    glyph: BAN,
    tone: "warning"
  }
};
const TONES = {
  positive: {
    bg: "rgba(187,247,208,0.12)",
    fg: "var(--color-success)",
    bd: "rgba(187,247,208,0.28)"
  },
  accent: {
    bg: "rgba(11,132,255,0.14)",
    fg: "var(--color-accent)",
    bd: "rgba(11,132,255,0.4)"
  },
  warning: {
    bg: "rgba(253,230,138,0.10)",
    fg: "var(--color-warning)",
    bd: "rgba(253,230,138,0.28)"
  }
};

/**
 * TrustBadge — compliance / protection signal pill used on projects and offerings.
 * One `type` selects glyph + label + tone. `iconOnly` renders a circular icon chip.
 */
function TrustBadge({
  type = "kyc-verified",
  label,
  iconOnly = false,
  size = 14,
  style = {},
  ...rest
}) {
  const t = TYPES[type] || TYPES["kyc-verified"];
  const c = TONES[t.tone];
  const text = label ?? t.label;
  if (iconOnly) {
    return /*#__PURE__*/React.createElement("span", _extends({
      title: text,
      "aria-label": text,
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size + 16,
        height: size + 16,
        borderRadius: "var(--radius-full)",
        backgroundColor: c.bg,
        color: c.fg,
        border: `1px solid ${c.bd}`,
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement(Glyph, {
      paths: t.glyph,
      size: size
    }));
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    title: text,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      font: "var(--type-label-sm)",
      fontWeight: 500,
      color: c.fg,
      backgroundColor: c.bg,
      border: `1px solid ${c.bd}`,
      borderRadius: "var(--radius-full)",
      padding: "4px 10px 4px 8px",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(Glyph, {
    paths: t.glyph,
    size: size
  }), text);
}
Object.assign(__ds_scope, { TrustBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fintech/TrustBadge.jsx", error: String((e && e.message) || e) }); }

// components/fintech/Wallet.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ArrowGlyph({
  down
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.85",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, down ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 17V3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m6 11 6 6 6-6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 21H5"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "m18 9-6-6-6 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 3v14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 21h14"
  })));
}

/**
 * Wallet — account balance card showing a peso cash balance and a token
 * holding, with Deposit and Redeem actions. Wraps MoneyAmount + Button.
 */
function Wallet({
  pesoBalance = 0,
  tokenBalance = 0,
  tokenSymbol = "AUR",
  onDeposit,
  onRedeem,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      backgroundColor: "var(--color-neutral)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-md)",
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--color-secondary)",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label-md)",
      color: "var(--color-secondary)"
    }
  }, "Wallet")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label-sm)",
      color: "var(--color-secondary)"
    }
  }, "Cash balance"), /*#__PURE__*/React.createElement(__ds_scope.MoneyAmount, {
    amount: pesoBalance,
    kind: "peso",
    size: "display"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 12px",
      borderRadius: "var(--radius-sm)",
      backgroundColor: "var(--color-surface-elevated)",
      border: "1px solid var(--color-border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label-sm)",
      color: "var(--color-secondary)"
    }
  }, "Token holdings"), /*#__PURE__*/React.createElement(__ds_scope.MoneyAmount, {
    amount: tokenBalance,
    kind: "token",
    symbol: tokenSymbol,
    size: "md"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "accent",
    size: "md",
    onClick: onDeposit,
    leadingIcon: /*#__PURE__*/React.createElement(ArrowGlyph, {
      down: true
    }),
    style: {
      flex: 1
    }
  }, "Deposit"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    size: "md",
    onClick: onRedeem,
    leadingIcon: /*#__PURE__*/React.createElement(ArrowGlyph, null),
    style: {
      flex: 1
    }
  }, "Redeem")));
}
Object.assign(__ds_scope, { Wallet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/fintech/Wallet.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — dark elevated field with a soft border and compact 40px height.
 * Focus relies on accent-blue border, not glow. Optional leading icon + shortcut hint.
 */
function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  leadingIcon = null,
  shortcut = null,
  disabled = false,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: 40,
      padding: "0 12px",
      backgroundColor: "var(--color-surface-elevated)",
      border: `1px solid ${focus ? "var(--color-accent)" : "var(--color-border)"}`,
      borderRadius: "var(--radius-md)",
      opacity: disabled ? 0.5 : 1,
      transition: "border-color .15s ease",
      boxSizing: "border-box",
      ...style
    }
  }, leadingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      color: "var(--color-secondary)",
      flexShrink: 0
    }
  }, leadingIcon), /*#__PURE__*/React.createElement("input", _extends({
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    type: type,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      background: "transparent",
      border: "none",
      outline: "none",
      color: "var(--color-on-surface)",
      font: "var(--type-body-sm)"
    }
  }, rest)), shortcut && /*#__PURE__*/React.createElement("kbd", {
    style: {
      flexShrink: 0,
      font: "var(--type-micro)",
      color: "var(--color-secondary)",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-sm)",
      padding: "2px 5px",
      background: "var(--color-primary-80)"
    }
  }, shortcut));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Switch — compact toggle. Off is a graphite track; on shifts to the accent
 * blue. Calm, no glow.
 */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      position: "relative",
      width: 38,
      height: 22,
      flexShrink: 0,
      borderRadius: "var(--radius-full)",
      border: "1px solid",
      borderColor: checked ? "var(--color-accent)" : "var(--color-border)",
      backgroundColor: checked ? "var(--color-accent)" : "var(--color-surface-elevated)",
      padding: 0,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background-color .15s ease, border-color .15s ease",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      left: checked ? 18 : 2,
      width: 16,
      height: 16,
      borderRadius: "var(--radius-full)",
      backgroundColor: checked ? "#fff" : "var(--color-secondary)",
      transition: "left .15s ease, background-color .15s ease"
    }
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SidebarItem — row-level navigation control. Muted + transparent by default,
 * darker surface fill and brighter text when `active`.
 */
function SidebarItem({
  children,
  icon = null,
  active = false,
  onClick,
  trailing = null,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const bg = active ? "var(--color-surface-elevated)" : hover ? "var(--color-primary-60)" : "transparent";
  const color = active || hover ? "var(--color-on-surface)" : "var(--color-secondary)";
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      font: "var(--type-label-md)",
      color,
      backgroundColor: bg,
      borderRadius: "var(--radius-md)",
      padding: "10px 12px",
      cursor: "pointer",
      userSelect: "none",
      transition: "background-color .15s ease, color .15s ease",
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexShrink: 0
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, children), trailing);
}
Object.assign(__ds_scope, { SidebarItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarItem.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/**
 * Tabs — underline-style segmented navigation. The active tab brightens its
 * label and shows an accent underline; depth stays flat and restrained.
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      borderBottom: "1px solid var(--color-border)",
      ...style
    }
  }, tabs.map(t => {
    const key = typeof t === "string" ? t : t.value;
    const label = typeof t === "string" ? t : t.label;
    const active = key === value;
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      onClick: () => onChange && onChange(key),
      style: {
        appearance: "none",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        font: "var(--type-label-lg)",
        color: active ? "var(--color-on-surface)" : "var(--color-secondary)",
        padding: "0 0 12px",
        marginBottom: -1,
        borderBottom: `2px solid ${active ? "var(--color-accent)" : "transparent"}`,
        transition: "color .15s ease, border-color .15s ease"
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Overview.jsx
try { (() => {
// Cobalt — Overview screen content
function Overview() {
  const {
    Card,
    Badge,
    Chip,
    Button
  } = window.CobaltMidnightDesignSystem_f8c3dc;
  const [filter, setFilter] = React.useState("All");
  const stats = [["Total balance", "$48,250.00", "success", "+12.4%", "vs last month"], ["Spending", "$9,840.18", "error", "−3.1%", "vs last month"], ["Incoming", "$21,300.00", "success", "+8.0%", "this month"], ["Pending", "$1,204.55", "warning", "2 holds", "awaiting clearance"]];
  const tx = [["Stripe payout", "Income · Mar 18", "+$12,400.00", "success"], ["AWS", "Infrastructure · Mar 17", "−$2,180.42", null], ["Figma", "Software · Mar 17", "−$144.00", null], ["Wire — Aurora Labs", "Transfer · Mar 16", "+$8,000.00", "success"], ["Payroll run", "Payroll · Mar 15", "−$24,902.10", null]];
  const filters = ["All", "Income", "Transfers", "Expenses"];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      display: "flex",
      flexDirection: "column",
      gap: 24,
      overflow: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 12
    }
  }, stats.map(([label, value, variant, delta, sub]) => /*#__PURE__*/React.createElement(Card, {
    key: label,
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label-sm)",
      color: "var(--color-secondary)",
      marginBottom: 10
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-headline-sm)",
      color: "var(--color-on-surface)",
      marginBottom: 10
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: variant
  }, delta), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-micro)",
      color: "var(--color-secondary)"
    }
  }, sub))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label-lg)",
      color: "var(--color-on-surface)"
    }
  }, "Cash flow"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "Last 30 days"))), /*#__PURE__*/React.createElement(Chart, null)), /*#__PURE__*/React.createElement(Card, {
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label-lg)",
      color: "var(--color-on-surface)",
      marginBottom: 16
    }
  }, "Accounts"), [["Operating", "$31,210.55", "USD · ****4021"], ["Reserve", "$15,000.00", "USD · ****8842"], ["FX — EUR", "€1,840.20", "EUR · ****1190"]].map(([n, bal, sub]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 0",
      borderBottom: "1px solid var(--color-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: "var(--radius-md)",
      background: "var(--color-surface-elevated)",
      border: "1px solid var(--color-border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--color-secondary)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "wallet",
    style: {
      width: 16,
      height: 16
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label-md)",
      color: "var(--color-on-surface)"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-micro)",
      color: "var(--color-secondary)"
    }
  }, sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      font: "var(--type-label-lg)",
      color: "var(--color-on-surface)"
    }
  }, bal))))), /*#__PURE__*/React.createElement(Card, {
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label-lg)",
      color: "var(--color-on-surface)"
    }
  }, "Recent activity"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginLeft: "auto"
    }
  }, filters.map(f => /*#__PURE__*/React.createElement(Chip, {
    key: f,
    selected: filter === f,
    onClick: () => setFilter(f)
  }, f)))), /*#__PURE__*/React.createElement("div", null, tx.map(([name, meta, amt, ok], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "12px 0",
      borderTop: i ? "1px solid var(--color-border)" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: "var(--radius-full)",
      background: "var(--color-surface-elevated)",
      border: "1px solid var(--color-border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--color-secondary)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": amt.startsWith("+") ? "arrow-down-left" : "arrow-up-right",
    style: {
      width: 16,
      height: 16
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label-md)",
      color: "var(--color-on-surface)"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-micro)",
      color: "var(--color-secondary)"
    }
  }, meta)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      font: "var(--type-body-sm)",
      fontWeight: 500,
      color: ok ? "var(--color-success)" : "var(--color-on-surface)"
    }
  }, amt))))));
}

// Lightweight inline bar chart — bars only, no SVG icon drawing.
function Chart() {
  const data = [42, 58, 36, 70, 52, 84, 61, 48, 92, 67, 75, 58];
  const max = Math.max(...data);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 8,
      height: 160
    }
  }, data.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: `${v / max * 100}%`,
      background: i === 8 ? "var(--color-accent)" : "var(--color-tertiary)",
      borderRadius: "var(--radius-sm) var(--radius-sm) 0 0"
    }
  }))));
}
window.Overview = Overview;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Overview.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Sidebar.jsx
try { (() => {
// Cobalt — dashboard sidebar
function Sidebar({
  active,
  setActive
}) {
  const {
    SidebarItem,
    Badge,
    Avatar
  } = window.CobaltMidnightDesignSystem_f8c3dc;
  const I = n => /*#__PURE__*/React.createElement("i", {
    "data-lucide": n,
    style: {
      width: 18,
      height: 18
    }
  });
  const items = [["overview", "layout-dashboard", "Overview", null], ["accounts", "wallet", "Accounts", null], ["cards", "credit-card", "Cards", "3"], ["payments", "arrow-left-right", "Payments", null], ["insights", "bar-chart-3", "Insights", null], ["settings", "settings", "Settings", null]];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 248,
      flexShrink: 0,
      background: "var(--color-surface)",
      borderRight: "1px solid var(--color-border)",
      display: "flex",
      flexDirection: "column",
      padding: 16,
      gap: 4,
      height: "100%",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "6px 8px 18px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mark.svg",
    width: "28",
    height: "28",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label-lg)",
      color: "var(--color-on-surface)",
      fontWeight: 700,
      fontSize: 17
    }
  }, "Cobalt")), items.map(([k, icon, label, count]) => /*#__PURE__*/React.createElement(SidebarItem, {
    key: k,
    icon: I(icon),
    active: active === k,
    onClick: () => setActive(k),
    trailing: count ? /*#__PURE__*/React.createElement(Badge, {
      variant: "neutral"
    }, count) : null
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 8px",
      borderTop: "1px solid var(--color-border)"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Ada Lovelace",
    size: 32
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label-md)",
      color: "var(--color-on-surface)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, "Ada Lovelace"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-micro)",
      color: "var(--color-secondary)"
    }
  }, "Treasury \xB7 Admin"))));
}
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/TopBar.jsx
try { (() => {
// Cobalt — dashboard top bar
function TopBar({
  title
}) {
  const {
    Input,
    Button
  } = window.CobaltMidnightDesignSystem_f8c3dc;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "18px 28px",
      borderBottom: "1px solid var(--color-border)"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--type-headline-sm)",
      color: "var(--color-on-surface)",
      flexShrink: 0
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      maxWidth: 360,
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search transactions, cards\u2026",
    shortcut: "\u2318K",
    leadingIcon: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "search",
      style: {
        width: 15,
        height: 15
      }
    })
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 40,
      height: 40,
      flexShrink: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-md)",
      color: "var(--color-secondary)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "bell",
    style: {
      width: 17,
      height: 17
    }
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    leadingIcon: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "plus",
      style: {
        width: 15,
        height: 15
      }
    })
  }, "New transfer"));
}
window.TopBar = TopBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/TopBar.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.FundingProgress = __ds_scope.FundingProgress;

__ds_ns.InvestorCount = __ds_scope.InvestorCount;

__ds_ns.MetaBadge = __ds_scope.MetaBadge;

__ds_ns.MilestoneTimeline = __ds_scope.MilestoneTimeline;

__ds_ns.MoneyAmount = __ds_scope.MoneyAmount;

__ds_ns.RiskBadge = __ds_scope.RiskBadge;

__ds_ns.RiskDisclosureCard = __ds_scope.RiskDisclosureCard;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.TrustBadge = __ds_scope.TrustBadge;

__ds_ns.Wallet = __ds_scope.Wallet;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.SidebarItem = __ds_scope.SidebarItem;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
