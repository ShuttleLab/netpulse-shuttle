// SEO / GEO content for the NetPulse landing page: bilingual use-cases, a comparison
// table, and an FAQ. Written for AI-search extraction (front-loaded, self-contained,
// concrete answers — see shuttlelab-handbook playbook 02 §4.6). The FAQ data is also the
// source for the FAQPage JSON-LD injected by app/[locale]/page.tsx, so visible text and
// schema text stay identical (Google penalises mismatches).
//
// NetPulse is NOT a VPN. The VPN-adjacent answers describe a real, honest use case
// (watching whether an existing VPN/proxy dropped via exit-IP change), never a claim to
// be one. Keep it that way.

type Bi = { en: string; zh: string };

export const USE_CASES: Bi[] = [
  {
    en: "Watch a VPN or proxy connection — NetPulse flags the moment your exit IP changes, so a dropped tunnel or an IP leak is visible immediately (it observes, it does not block).",
    zh: "盯住 VPN 或代理连接——出口 IP 一变 NetPulse 立刻标记，隧道掉线或 IP 泄漏一眼可见（它只观测，不拦截）。",
  },
  {
    en: "Know whether the internet is actually down, not just one app — a strict reachability check tells you if it's your connection or the service.",
    zh: "判断是不是真的断网，而不是某个 app 的问题——严格的连通性检测告诉你究竟是你的网络还是对方的服务出问题。",
  },
  {
    en: "Flaky Wi-Fi, public hotspots and captive portals — NetPulse ignores login/redirect pages and only reports a genuinely open connection.",
    zh: "不稳定的 Wi-Fi、公共热点、强制门户——NetPulse 忽略登录/跳转页，只在真正联网时才报成功。",
  },
  {
    en: "Always-on or remote-work devices where a silent disconnect costs you — get a vibration/sound alert the instant connectivity drops.",
    zh: "常开设备或远程办公场景，悄无声息地掉线代价很高——断网瞬间用震动/声音提醒你。",
  },
  {
    en: "Verify a new router, ISP or failover link actually stays up — the rolling check log with latency trend shows stability over time.",
    zh: "验证新路由、新宽带或故障切换链路是否真的稳定——带延迟趋势的滚动检查日志记录长期表现。",
  },
];

export const COMPARISON = {
  en: {
    heading: "NetPulse vs. other ways to watch a connection",
    columns: ["", "NetPulse", "VPN kill switch", "Server monitor (e.g. UptimeRobot)"],
    rows: [
      ["Runs on your own device", "✓", "✓", "— (runs in the cloud)"],
      ["Tells you if YOUR internet is down", "✓", "partial", "— (watches a server)"],
      ["Verifies real reachability (strict 204, ignores captive portals)", "✓", "—", "✓"],
      ["Shows your current exit IP & location", "✓", "—", "—"],
      ["Alerts when the connection drops", "✓ vibrate / sound", "blocks traffic instead", "✓ email / SMS"],
      ["Blocks traffic when a tunnel drops", "— (observe only)", "✓", "—"],
      ["Free & open source", "✓ AGPL-3.0", "varies", "freemium"],
    ],
  },
  zh: {
    heading: "NetPulse 与其它“看连接”方式的对比",
    columns: ["", "NetPulse", "VPN kill switch", "服务端监控（如 UptimeRobot）"],
    rows: [
      ["运行在你自己的设备上", "✓", "✓", "—（运行在云端）"],
      ["告诉你“你”是否断网", "✓", "部分", "—（监控的是服务器）"],
      ["验证真正可达（严格 204，忽略强制门户）", "✓", "—", "✓"],
      ["显示你当前的出口 IP 及归属地", "✓", "—", "—"],
      ["连接断开时提醒", "✓ 震动 / 声音", "改为拦截流量", "✓ 邮件 / 短信"],
      ["隧道掉线时拦截流量", "—（仅观测）", "✓", "—"],
      ["免费且开源", "✓ AGPL-3.0", "视产品而定", "免费增值"],
    ],
  },
};

export const FAQS: { q: Bi; a: Bi }[] = [
  {
    q: { en: "What is NetPulse?", zh: "NetPulse 是什么？" },
    a: {
      en: "NetPulse is a free, open-source Android app that continuously checks whether the open internet is actually reachable and shows your current public exit IP and its location. It runs as a lightweight foreground service, logs every check with timestamp and latency, and alerts you the moment the connection drops. It is a passive monitor — it observes your existing connection and never routes or blocks traffic. It requires Android 8.0 (API 26) or later and is licensed under AGPL-3.0.",
      zh: "NetPulse 是一款免费开源的安卓应用，持续检测互联网是否真正可达，并显示你当前的公网出口 IP 及其归属地。它以轻量前台服务运行，按时间和延迟逐条记录每次检查，并在连接断开的瞬间提醒你。它是被动观测工具——只观察你现有的连接，不路由也不拦截任何流量。需要 Android 8.0（API 26）及以上，采用 AGPL-3.0 许可。",
    },
  },
  {
    q: { en: "Is NetPulse a VPN?", zh: "NetPulse 是 VPN 吗？" },
    a: {
      en: "No. NetPulse is not a VPN and does not tunnel, route, encrypt, or block any of your traffic. It only sends small probe requests to detect whether the internet is reachable and looks up your current exit IP — nothing passes through it, and it requests no VPN permission. If you already use a VPN, NetPulse works well alongside it to watch the connection (see below), but it never replaces or controls the VPN itself.",
      zh: "不是。NetPulse 不是 VPN，不隧道、不路由、不加密、也不拦截你的任何流量。它只发送很小的探测请求来判断互联网是否可达，并查询你当前的出口 IP——没有任何流量经过它，也不申请 VPN 权限。如果你已经在用 VPN，NetPulse 可以很好地配合它来监控连接（见下），但它从不替代或控制 VPN 本身。",
    },
  },
  {
    q: { en: "Can NetPulse tell me if my VPN or proxy dropped?", zh: "NetPulse 能监控 VPN / 代理是否掉线吗？" },
    a: {
      en: "Indirectly, yes — and it's a common reason people use it. NetPulse shows your current exit IP and flags the exact moment it changes, so if your VPN or proxy disconnects and your traffic falls back to your ISP's real IP, you'll see the exit IP change and get an alert. It also detects when connectivity is lost entirely. Note that NetPulse only observes: unlike a kill switch it does not block traffic when the tunnel drops, so use it for awareness rather than enforcement.",
      zh: "可以间接判断——这也是很多人用它的原因。NetPulse 显示你当前的出口 IP，并在它变化的那一刻标记出来；所以一旦 VPN 或代理掉线、流量回落到你 ISP 的真实 IP，你会看到出口 IP 变化并收到提醒。它也能检测完全断网。注意 NetPulse 只观测：与 kill switch 不同，隧道掉线时它不会拦截流量，所以它用于“知情”而非“强制阻断”。",
    },
  },
  {
    q: { en: "How does NetPulse know the connection is real and not a captive portal?", zh: "它怎么判断“真正联网”，区分强制门户？" },
    a: {
      en: "Each check requests a lightweight generate_204 endpoint and treats only a strict HTTP 204 No Content as success. Captive portals and hijack pages return a redirect or a 200 with HTML instead of a clean 204, so NetPulse correctly reports them as not genuinely connected. This is the same technique Android and Chrome OS use for their own connectivity checks. The check interval is fixed but configurable.",
      zh: "每次检查请求一个轻量的 generate_204 端点，只有严格的 HTTP 204 No Content 才算成功。强制门户和劫持页面返回的是重定向或带 HTML 的 200，而不是干净的 204，因此 NetPulse 会正确地判定它们“并未真正联网”。这正是 Android 和 Chrome OS 自身连通性检测所用的方法。检查间隔固定但可配置。",
    },
  },
  {
    q: { en: "What does the exit IP feature show?", zh: "出口 IP 功能显示什么？" },
    a: {
      en: "NetPulse shows your current public exit IP — the address the internet sees you coming from — with its region and ISP, and you can tap to copy it. The check log highlights the exact moment the exit IP changes, which is useful for spotting a VPN/proxy switch, an ISP failover, or a CGNAT reassignment. The geolocation comes from a public lookup service (ip.im in English, ip9.com.cn in Chinese); NetPulse sends it nothing beyond the request itself.",
      zh: "NetPulse 显示你当前的公网出口 IP——即互联网看到你来自的地址——连同地区和运营商，点击即可复制。检查日志会高亮出口 IP 发生变化的那一刻，便于发现 VPN/代理切换、宽带故障切换或 CGNAT 重新分配。归属地来自公开查询服务（英文用 ip.im，中文用 ip9.com.cn）；除请求本身外 NetPulse 不向其发送任何数据。",
    },
  },
  {
    q: { en: "Does it alert me the moment the internet drops?", zh: "断网时会第一时间提醒我吗？" },
    a: {
      en: "Yes. When connectivity is lost, NetPulse can vibrate and play a sound the instant it happens, and the persistent status-bar icon switches to a distinct cross glyph so the state is readable at a glance. You get one-tap start/stop and a countdown to the next check. Alerts are optional and configurable, and monitoring auto-restarts after a reboot if it was active.",
      zh: "会。连接断开时，NetPulse 可在发生的瞬间震动并发出声音，常驻状态栏图标会切换成醒目的叉号，一眼即可看清状态。提供一键启停和下次检查倒计时。提醒可选且可配置；若监控原本开启，重启手机后会自动恢复运行。",
    },
  },
  {
    q: { en: "Will NetPulse drain my battery?", zh: "NetPulse 耗电吗？" },
    a: {
      en: "It's designed to be light. NetPulse runs a single foreground service that sends one tiny generate_204 request per interval (a few hundred bytes), with no continuous radio use between checks. Longer intervals use less battery, so you can tune the interval to balance freshness against power. There are no background analytics or wake-heavy tasks.",
      zh: "设计上很省电。NetPulse 只运行一个前台服务，每个间隔发送一个极小的 generate_204 请求（几百字节），两次检查之间不持续占用网络。间隔越长越省电，你可以调节间隔在“及时”与“省电”之间取舍。没有后台统计，也没有频繁唤醒的重任务。",
    },
  },
  {
    q: { en: "Is my data private? Does it send anything to a server?", zh: "隐私如何？会向服务器上传数据吗？" },
    a: {
      en: "NetPulse runs entirely on your device with no account, no advertising, and no analytics or tracking SDKs, and we operate no backend that receives your data. The check log and settings stay local and are deleted when you clear them or uninstall. Its only outbound requests are the connectivity probes and the exit-IP lookup, both essential to its function; see the Privacy Policy for the exact services it contacts.",
      zh: "NetPulse 完全在你的设备上运行，无账户、无广告、无任何统计或追踪 SDK，我们也没有任何接收你数据的后端。检查日志和设置只存本地，清除或卸载即删除。它唯一的对外请求是连通性探测和出口 IP 查询，二者都是核心功能所必需；具体联系的服务见隐私政策。",
    },
  },
  {
    q: { en: "Which Android versions are supported, and is it really free?", zh: "支持哪些安卓版本？真的免费吗？" },
    a: {
      en: "NetPulse runs on Android 8.0 (API 26) and later. It is completely free — no ads, no in-app purchases, no paywalled features — and open source under AGPL-3.0, so you can read or build the code yourself. You download the APK directly from GitHub Releases; a Google Play listing is planned. Updates are published on the same GitHub Releases page.",
      zh: "NetPulse 运行于 Android 8.0（API 26）及以上。完全免费——无广告、无内购、无付费墙功能——并以 AGPL-3.0 开源，你可以自行查看或编译源码。APK 直接从 GitHub Releases 下载；Google Play 上架在计划中。更新在同一个 GitHub Releases 页面发布。",
    },
  },
  {
    q: { en: "How is NetPulse different from a server uptime monitor like UptimeRobot?", zh: "和 UptimeRobot 这类服务端监控有什么不同？" },
    a: {
      en: "A server uptime monitor such as UptimeRobot pings your website or server from the cloud to tell you whether other people can reach it. NetPulse does the opposite: it runs on your own phone and tells you whether your device can reach the internet, and what your exit IP currently is. They solve different problems — use a server monitor for your services and NetPulse for your own connection. NetPulse needs no account and keeps all data on the device.",
      zh: "像 UptimeRobot 这样的服务端监控从云端去 ping 你的网站或服务器，告诉你“别人能不能访问它”。NetPulse 正相反：它运行在你自己的手机上，告诉你“你的设备能不能上网”以及你当前的出口 IP 是什么。两者解决不同问题——服务用服务端监控，自己的连接用 NetPulse。NetPulse 无需账户，所有数据留在设备上。",
    },
  },
];

export function SeoFaq({ locale }: { locale: string }) {
  const zh = locale === "zh";
  const cmp = zh ? COMPARISON.zh : COMPARISON.en;
  const pick = (b: Bi) => (zh ? b.zh : b.en);

  return (
    <>
      {/* Use cases */}
      <section className="bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
            {zh ? "什么时候用 NetPulse" : "When to use NetPulse"}
          </h2>
          <ul className="space-y-3">
            {USE_CASES.map((u) => (
              <li key={u.en} className="flex gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <p className="text-[15px] text-muted-foreground leading-relaxed">{pick(u)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">{cmp.heading}</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full border-collapse text-left text-[14px]">
              <thead>
                <tr className="bg-muted/50">
                  {cmp.columns.map((c, i) => (
                    <th key={i} className={`p-3 font-semibold ${i === 0 ? "" : "text-center"} ${i === 1 ? "text-primary" : ""}`}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cmp.rows.map((row, ri) => (
                  <tr key={ri} className="border-t border-border">
                    {row.map((cell, ci) => (
                      <td key={ci} className={`p-3 ${ci === 0 ? "text-muted-foreground" : "text-center"} ${ci === 1 ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
            {zh ? "常见问题" : "Frequently asked questions"}
          </h2>
          <div className="space-y-5">
            {FAQS.map((f) => (
              <div key={f.q.en} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <h3 className="font-semibold">{pick(f.q)}</h3>
                <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">{pick(f.a)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
