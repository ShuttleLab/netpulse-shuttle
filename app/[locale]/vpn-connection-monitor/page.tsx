import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Download, ArrowLeft } from "lucide-react";

// Long-form GEO landing page targeting the "VPN connection monitor / detect VPN drop"
// intent — the query the site was missing. NetPulse is NOT a VPN; this page targets the
// honest adjacent use case (watch whether an existing VPN/proxy is still up via exit-IP
// change + reachability loss). See shuttlelab-handbook playbook 02 §7b.
// Content is bilingual + locale-branched; the FAQ/HowTo data is the single source for the
// FAQPage/HowTo JSON-LD so visible text == schema text.

const BASE = "https://netpulse.shuttlelab.org";
const SLUG = "vpn-connection-monitor";
const DOWNLOAD_URL = "https://github.com/ShuttleLab/NetPulse/releases/latest";
const SOURCE_URL = "https://github.com/ShuttleLab/NetPulse";
const PUBLISHED = "2026-06-10";

type Step = { title: string; desc: string };
type QA = { q: string; a: string };
type Content = {
  title: string;
  metaDesc: string;
  h1: string;
  lead: string;
  whyH2: string;
  whyParas: string[];
  howH2: string;
  howIntro: string;
  howPoints: string[];
  boundaryH2: string;
  boundaryParas: string[];
  setupH2: string;
  setupSteps: Step[];
  signsH2: string;
  signs: string[];
  faqH2: string;
  faqs: QA[];
  getH2: string;
  download: string;
  source: string;
  backHome: string;
};

const EN: Content = {
  title: "VPN Connection Monitor for Android — Detect Drops & IP Leaks | NetPulse",
  metaDesc:
    "Watch whether your VPN or proxy is still connected on Android. NetPulse flags the moment your exit IP changes or the connection drops — a monitor, not a VPN.",
  h1: "VPN connection monitor for Android: detect drops and IP changes",
  lead: "NetPulse is a free, open-source Android app that monitors whether your VPN or proxy connection is still up. It is not a VPN itself — instead it continuously checks that the internet is reachable and shows your current exit IP, then alerts you the instant the connection drops or your exit IP changes. If your tunnel silently fails and your traffic falls back to your ISP's real IP, NetPulse makes that visible right away.",
  whyH2: "Why monitor a VPN connection?",
  whyParas: [
    "VPNs and proxies fail quietly. A tunnel can drop on a network switch, a sleeping radio, a server timeout, or an app crash — and your phone keeps browsing as if nothing happened, now over your real ISP connection. Unless something tells you, you may not notice for hours.",
    "A dropped tunnel has two observable symptoms: your exit IP reverts to your ISP's address, and there is usually a brief loss of connectivity while the tunnel reconnects. NetPulse watches both — it shows your live exit IP and highlights the exact moment it changes, and it detects when the open internet stops being reachable.",
    "This matters most for people who rely on a stable exit IP or location: remote workers behind a corporate VPN, users on a privacy VPN, anyone using a proxy for a fixed region, or developers testing geo-based behaviour.",
  ],
  howH2: "How NetPulse detects a VPN drop",
  howIntro: "NetPulse never touches your VPN. It observes the connection from the outside and infers a drop from two independent signals:",
  howPoints: [
    "Exit IP change — every check looks up your current public exit IP. While the VPN is up you see the VPN server's IP and region; the moment it drops you see your ISP's IP instead, and the check log highlights the change.",
    "Reachability loss — each check requests a lightweight generate_204 endpoint and accepts only a strict 204 No Content. A reconnecting tunnel usually causes a short reachability gap, which NetPulse logs and can alert on.",
  ],
  boundaryH2: "A monitor, not a kill switch",
  boundaryParas: [
    "Be clear about the boundary: NetPulse observes, it does not enforce. A VPN kill switch blocks all traffic the moment the tunnel drops so nothing leaks; NetPulse does not block anything — it tells you the drop happened. If you need hard leak prevention, use your VPN client's built-in kill switch, and use NetPulse alongside it for awareness, a check log, and a second pair of eyes on the connection.",
    "Because it only observes, NetPulse needs no VPN permission, routes none of your traffic, and adds no attack surface to your tunnel. It runs as a single lightweight foreground service and keeps every check on your device.",
  ],
  setupH2: "How to set up VPN monitoring with NetPulse",
  setupSteps: [
    { title: "Install NetPulse", desc: "Download the APK from GitHub Releases and install it on Android 8.0 (API 26) or later." },
    { title: "Connect your VPN as usual", desc: "Start your VPN or proxy app the way you normally do. NetPulse runs alongside it and never interferes with the tunnel." },
    { title: "Start monitoring", desc: "Open NetPulse and tap start. It begins probing on a fixed, configurable interval and shows your current exit IP and region." },
    { title: "Enable drop alerts", desc: "Turn on the vibration and sound alerts so you are notified the moment connectivity drops or your exit IP changes." },
  ],
  signsH2: "Signs your VPN has dropped",
  signs: [
    "Your exit IP in NetPulse suddenly matches your ISP instead of the VPN server.",
    "A check fails (cross icon) and then recovers a few seconds later — typical of a reconnecting tunnel.",
    "The exit-IP region changes from your chosen location back to your real one.",
  ],
  faqH2: "Frequently asked questions",
  faqs: [
    { q: "Can NetPulse reconnect my VPN automatically?", a: "No. NetPulse only observes and alerts; it cannot start, stop, or reconnect your VPN because it never controls the tunnel. Use your VPN client's auto-reconnect for that. NetPulse's job is to make a drop visible so you can react or investigate." },
    { q: "Is NetPulse a kill switch?", a: "No. A kill switch blocks traffic when the tunnel drops; NetPulse does not block anything. It is a passive monitor that reports the drop. For leak prevention, enable the kill switch in your VPN client and run NetPulse alongside it for visibility and a check log." },
    { q: "Does NetPulse see my VPN traffic?", a: "No. NetPulse does not route, intercept, or inspect any traffic, and it requests no VPN permission. Its only network activity is small connectivity probes and an exit-IP lookup. Everything stays on your device — no account, no analytics." },
    { q: "How quickly will I know the VPN dropped?", a: "As fast as your check interval. NetPulse probes on a fixed, configurable interval and alerts on the first failed check or exit-IP change. A shorter interval detects drops sooner at a small battery cost; a longer interval saves power." },
    { q: "Does it work with any VPN or proxy?", a: "Yes. Because NetPulse observes from outside the tunnel it is VPN-agnostic — it works with any VPN client, WireGuard or OpenVPN config, or proxy, since it only reads your resulting exit IP and reachability. It needs no integration with the VPN app." },
  ],
  getH2: "Get NetPulse",
  download: "Download APK",
  source: "View source",
  backHome: "Back to NetPulse home",
};

const ZH: Content = {
  title: "安卓 VPN 连接监控——检测掉线与 IP 变化 | NetPulse",
  metaDesc:
    "在安卓上监控你的 VPN 或代理是否还连着。NetPulse 在出口 IP 变化或连接断开的瞬间提醒你——它是监控工具，不是 VPN。",
  h1: "安卓 VPN 连接监控：检测掉线与出口 IP 变化",
  lead: "NetPulse 是一款免费开源的安卓应用，用来监控你的 VPN 或代理连接是否还在线。它本身不是 VPN——而是持续检测互联网是否可达、显示你当前的出口 IP，并在连接断开或出口 IP 变化的瞬间提醒你。如果隧道悄悄掉线、流量回落到你 ISP 的真实 IP，NetPulse 会立刻让你看到。",
  whyH2: "为什么要监控 VPN 连接？",
  whyParas: [
    "VPN 和代理常常悄无声息地断掉。切换网络、休眠射频、服务器超时或 app 崩溃都可能让隧道掉线，而手机照常上网，只是已经换回了你的真实 ISP 连接。没有东西提醒的话，你可能几个小时都察觉不到。",
    "隧道掉线有两个可观测的征兆：出口 IP 回到你 ISP 的地址，且隧道重连期间往往有短暂的断网。NetPulse 同时盯住这两点——实时显示出口 IP 并高亮它变化的那一刻，也检测互联网何时变得不可达。",
    "对依赖稳定出口 IP 或地区的人尤其重要：用企业 VPN 的远程办公者、用隐私 VPN 的用户、用代理固定某地区的人，以及测试地区相关行为的开发者。",
  ],
  howH2: "NetPulse 如何检测 VPN 掉线",
  howIntro: "NetPulse 从不接触你的 VPN。它从外部观察连接，通过两个相互独立的信号推断掉线：",
  howPoints: [
    "出口 IP 变化——每次检查都查询你当前的公网出口 IP。VPN 在线时你看到的是 VPN 服务器的 IP 和地区；一旦掉线，看到的就变成你 ISP 的 IP，检查日志会高亮这次变化。",
    "可达性丢失——每次检查请求一个轻量的 generate_204 端点，只接受严格的 204 No Content。隧道重连通常会造成短暂的可达性缺口，NetPulse 会记录并可就此提醒。",
  ],
  boundaryH2: "是监控，不是 kill switch",
  boundaryParas: [
    "边界要说清楚：NetPulse 只观测，不强制。VPN kill switch 会在隧道掉线的瞬间阻断所有流量、防止泄漏；NetPulse 不阻断任何流量——它只告诉你掉线发生了。如果你需要硬性防泄漏，请用 VPN 客户端自带的 kill switch，并用 NetPulse 在旁提供知情、检查日志和一双额外盯着连接的眼睛。",
    "正因为只观测，NetPulse 不需要 VPN 权限、不路由你的任何流量，也不给你的隧道增加攻击面。它只运行一个轻量的前台服务，每次检查都留在你的设备上。",
  ],
  setupH2: "如何用 NetPulse 监控 VPN",
  setupSteps: [
    { title: "安装 NetPulse", desc: "从 GitHub Releases 下载 APK，安装在 Android 8.0（API 26）及以上的设备上。" },
    { title: "照常连接你的 VPN", desc: "像平时一样启动你的 VPN 或代理 app。NetPulse 在旁运行，绝不干扰隧道。" },
    { title: "开始监控", desc: "打开 NetPulse 点击开始。它会按固定且可配置的间隔探测，并显示你当前的出口 IP 和地区。" },
    { title: "开启掉线提醒", desc: "打开震动和声音提醒，连接断开或出口 IP 变化时第一时间通知你。" },
  ],
  signsH2: "VPN 掉线的迹象",
  signs: [
    "NetPulse 里的出口 IP 突然变成了你的 ISP，而不是 VPN 服务器。",
    "某次检查失败（叉号）几秒后又恢复——典型的隧道重连。",
    "出口 IP 的地区从你选的位置变回了你的真实位置。",
  ],
  faqH2: "常见问题",
  faqs: [
    { q: "NetPulse 能自动帮我重连 VPN 吗？", a: "不能。NetPulse 只观测和提醒，无法启动、停止或重连你的 VPN，因为它从不控制隧道。自动重连请用你的 VPN 客户端。NetPulse 的职责是让掉线可见，方便你及时反应或排查。" },
    { q: "NetPulse 是 kill switch 吗？", a: "不是。kill switch 会在隧道掉线时阻断流量；NetPulse 不阻断任何东西，它是被动监控、只报告掉线。要防泄漏请在 VPN 客户端里开启 kill switch，并用 NetPulse 配合它提供可见性和检查日志。" },
    { q: "NetPulse 看得到我的 VPN 流量吗？", a: "看不到。NetPulse 不路由、不拦截、不检查任何流量，也不申请 VPN 权限。它唯一的网络活动是很小的连通性探测和一次出口 IP 查询。所有数据留在设备上——无账户、无统计。" },
    { q: "VPN 掉线后我多快能知道？", a: "取决于你的检查间隔。NetPulse 按固定且可配置的间隔探测，并在第一次检查失败或出口 IP 变化时提醒。间隔越短发现越快，略微费电；间隔越长越省电。" },
    { q: "它支持任何 VPN 或代理吗？", a: "支持。因为 NetPulse 从隧道外部观察，所以与具体 VPN 无关——任何 VPN 客户端、WireGuard 或 OpenVPN 配置、或代理都行；它只读取你最终的出口 IP 和可达性，不需要和 VPN app 集成。" },
  ],
  getH2: "获取 NetPulse",
  download: "下载 APK",
  source: "查看源码",
  backHome: "返回 NetPulse 首页",
};

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = locale === "zh" ? ZH : EN;
  const path = `/${SLUG}/`;
  const keywords =
    locale === "zh"
      ? ["VPN 连接监控", "检测 VPN 掉线", "VPN 掉线提醒", "VPN 断线检测", "出口 IP 监控", "IP 泄漏检测", "安卓 VPN 监控", "代理掉线提醒", "NetPulse"]
      : ["VPN connection monitor", "detect VPN drop", "VPN drop alert", "is my VPN connected", "exit IP monitor", "IP leak detection", "VPN monitor Android", "proxy disconnect alert", "NetPulse"];
  return {
    title: c.title,
    description: c.metaDesc,
    keywords,
    alternates: {
      canonical: locale === "en" ? `${BASE}${path}` : `${BASE}/${locale}${path}`,
      languages: { en: `${BASE}${path}`, zh: `${BASE}/zh${path}`, "x-default": `${BASE}${path}` },
    },
    openGraph: {
      title: c.title,
      description: c.metaDesc,
      siteName: "NetPulse",
      type: "article",
      locale: locale === "zh" ? "zh_CN" : "en_US",
    },
  };
}

export default async function VpnMonitorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = locale === "zh" ? ZH : EN;
  const url = locale === "en" ? `${BASE}/${SLUG}/` : `${BASE}/${locale}/${SLUG}/`;
  const homeHref = locale === "en" ? "/" : `/${locale}/`;

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: c.h1,
    description: c.metaDesc,
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
    publisher: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
    about: { "@type": "MobileApplication", name: "NetPulse", operatingSystem: "Android 8.0+", applicationCategory: "UtilitiesApplication" },
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: c.setupH2,
    step: c.setupSteps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.desc })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.h1}</h1>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{c.lead}</p>

      <div className="mt-7 flex flex-wrap gap-3">
        <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
          <Download className="size-5" /> {c.download}
        </a>
        <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-medium transition hover:bg-accent/50">
          {c.source}
        </a>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{c.whyH2}</h2>
        {c.whyParas.map((p, i) => (
          <p key={i} className="mt-3 leading-relaxed text-muted-foreground">{p}</p>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{c.howH2}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{c.howIntro}</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
          {c.howPoints.map((p, i) => <li key={i} className="leading-relaxed">{p}</li>)}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{c.boundaryH2}</h2>
        {c.boundaryParas.map((p, i) => (
          <p key={i} className="mt-3 leading-relaxed text-muted-foreground">{p}</p>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{c.setupH2}</h2>
        <ol className="mt-4 space-y-4">
          {c.setupSteps.map((s, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{c.signsH2}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
          {c.signs.map((s, i) => <li key={i} className="leading-relaxed">{s}</li>)}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{c.faqH2}</h2>
        <div className="mt-4 space-y-5">
          {c.faqs.map((f, i) => (
            <div key={i}>
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-1 leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-bold">{c.getH2}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">
            <Download className="size-5" /> {c.download}
          </a>
          <a href={homeHref}
             className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-medium transition hover:bg-accent/50">
            <ArrowLeft className="size-4" /> {c.backHome}
          </a>
        </div>
      </section>
    </article>
  );
}
