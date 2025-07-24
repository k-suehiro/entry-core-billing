# Entry Core Billing システム デザイン指示書

## 1. デザインコンセプト

### 1.1 デザインテーマ
**"Professional & Efficient"** - プロフェッショナルで効率的な業務システム

### 1.2 デザイン原則
- **明確性**: 情報の階層が明確で理解しやすい
- **一貫性**: 全画面で統一されたデザインルール
- **効率性**: 業務効率を向上させるUI/UX
- **アクセシビリティ**: 誰もが使いやすいインターフェース

### 1.3 ターゲットユーザー
- 営業担当者（20-50代）
- 購買担当者（20-50代）
- 経理担当者（30-60代）
- システム管理者（30-50代）

---

## 2. カラーパレット

### 2.1 プライマリカラー

#### 売上伝票テーマ（ブルー系）
```css
/* メインカラー */
--primary-blue: #3B82F6;        /* blue-500 */
--primary-blue-light: #60A5FA;  /* blue-400 */
--primary-blue-dark: #2563EB;   /* blue-600 */

/* 背景カラー */
--bg-blue-50: #EFF6FF;          /* blue-50 */
--bg-blue-100: #DBEAFE;         /* blue-100 */
--bg-blue-200: #BFDBFE;         /* blue-200 */

/* テキストカラー */
--text-blue-600: #2563EB;       /* blue-600 */
--text-blue-700: #1D4ED8;       /* blue-700 */
--text-blue-800: #1E40AF;       /* blue-800 */
```

#### 仕入伝票テーマ（グリーン系）
```css
/* メインカラー */
--primary-green: #10B981;       /* emerald-500 */
--primary-green-light: #34D399; /* emerald-400 */
--primary-green-dark: #059669;  /* emerald-600 */

/* 背景カラー */
--bg-green-50: #ECFDF5;         /* emerald-50 */
--bg-green-100: #D1FAE5;        /* emerald-100 */
--bg-green-200: #A7F3D0;        /* emerald-200 */

/* テキストカラー */
--text-green-600: #059669;      /* emerald-600 */
--text-green-700: #047857;      /* emerald-700 */
--text-green-800: #065F46;      /* emerald-800 */
```

### 2.2 セカンダリカラー

#### グレースケール
```css
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;
```

#### ステータスカラー
```css
/* 成功 */
--success: #10B981;             /* emerald-500 */
--success-light: #D1FAE5;       /* emerald-100 */

/* 警告 */
--warning: #F59E0B;             /* amber-500 */
--warning-light: #FEF3C7;       /* amber-100 */

/* エラー */
--error: #EF4444;               /* red-500 */
--error-light: #FEE2E2;         /* red-100 */

/* 情報 */
--info: #3B82F6;                /* blue-500 */
--info-light: #DBEAFE;          /* blue-100 */
```

### 2.3 カラー使用ルール

#### 優先度
1. **プライマリカラー**: メインアクション、重要な情報
2. **セカンダリカラー**: サブアクション、補助情報
3. **グレースケール**: テキスト、背景、ボーダー
4. **ステータスカラー**: 状態表示、フィードバック

#### コントラスト比
- **AAA準拠**: 7:1以上（小さなテキスト）
- **AA準拠**: 4.5:1以上（通常テキスト）
- **大きなテキスト**: 3:1以上

---

## 3. タイポグラフィ

### 3.1 フォントファミリー
```css
/* プライマリフォント */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
             'Helvetica Neue', sans-serif;

/* 等幅フォント（数値、コード） */
font-family: 'SF Mono', Monaco, 'Inconsolata', 'Roboto Mono', 
             'Source Code Pro', monospace;

/* 日本語フォント */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
             'Hiragino Sans', 'Noto Sans CJK JP', 'Meiryo', sans-serif;
```

### 3.2 フォントサイズ階層
```css
/* 見出し */
--text-3xl: 1.875rem;    /* 30px - ページタイトル */
--text-2xl: 1.5rem;      /* 24px - セクションタイトル */
--text-xl: 1.25rem;      /* 20px - サブセクション */
--text-lg: 1.125rem;     /* 18px - 大きなテキスト */

/* 本文 */
--text-base: 1rem;       /* 16px - 標準テキスト */
--text-sm: 0.875rem;     /* 14px - 小さなテキスト */
--text-xs: 0.75rem;      /* 12px - キャプション */
```

### 3.3 フォントウェイト
```css
--font-light: 300;       /* ライト */
--font-normal: 400;      /* ノーマル */
--font-medium: 500;      /* ミディアム */
--font-semibold: 600;    /* セミボールド */
--font-bold: 700;        /* ボールド */
```

### 3.4 行間（Line Height）
```css
--leading-tight: 1.25;   /* 125% - 見出し用 */
--leading-normal: 1.5;   /* 150% - 本文用 */
--leading-relaxed: 1.625; /* 162.5% - 長文用 */
```

### 3.5 文字間隔（Letter Spacing）
```css
--tracking-tight: -0.025em;  /* タイトル用 */
--tracking-normal: 0em;      /* 標準 */
--tracking-wide: 0.025em;    /* 強調用 */
```

---

## 4. レイアウト・グリッドシステム

### 4.1 ブレークポイント
```css
/* モバイル */
@media (min-width: 640px) { /* sm */ }

/* タブレット */
@media (min-width: 768px) { /* md */ }

/* デスクトップ */
@media (min-width: 1024px) { /* lg */ }

/* 大画面 */
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### 4.2 コンテナ幅
```css
/* 最大幅 */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;

/* システム標準 */
--container-main: 1280px;    /* max-w-7xl */
```

### 4.3 スペーシングシステム（8pxベース）
```css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
```

### 4.4 グリッドシステム
```css
/* 12カラムグリッド */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

/* フォーム用グリッド */
.form-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}
```

---

## 5. コンポーネントデザイン

### 5.1 ボタン

#### プライマリボタン
```css
.btn-primary {
  background-color: var(--primary-blue);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover {
  background-color: var(--primary-blue-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}
```

#### セカンダリボタン
```css
.btn-secondary {
  background-color: white;
  color: var(--gray-700);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  border: 1px solid var(--gray-300);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn-secondary:hover {
  background-color: var(--gray-50);
  border-color: var(--gray-400);
}
```

#### 危険ボタン
```css
.btn-danger {
  background-color: var(--error);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
```

### 5.2 入力フィールド

#### 標準入力
```css
.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 2px solid var(--gray-200);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: white;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input:hover {
  border-color: var(--gray-300);
}
```

#### 読み取り専用
```css
.form-input-readonly {
  background-color: var(--gray-50);
  color: var(--gray-500);
  border-color: var(--gray-200);
  cursor: not-allowed;
}
```

#### エラー状態
```css
.form-input-error {
  border-color: var(--error);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

### 5.3 テーブル

#### 標準テーブル
```css
.table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.table th {
  background-color: var(--gray-50);
  padding: 0.75rem;
  text-align: left;
  font-weight: 500;
  font-size: 0.75rem;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--gray-200);
}

.table td {
  padding: 0.75rem;
  font-size: 0.875rem;
  border-bottom: 1px solid var(--gray-200);
}

.table tbody tr:hover {
  background-color: var(--gray-50);
  cursor: pointer;
}
```

### 5.4 カード

#### 標準カード
```css
.card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: box-shadow 0.2s ease-in-out;
}

.card:hover {
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.card-header {
  background-color: var(--gray-50);
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--gray-200);
  font-weight: 500;
}

.card-body {
  padding: 1.5rem;
}
```

### 5.5 バッジ・ラベル

#### ステータスバッジ
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-blue {
  background-color: var(--bg-blue-100);
  color: var(--text-blue-800);
}

.badge-green {
  background-color: var(--bg-green-100);
  color: var(--text-green-800);
}

.badge-gray {
  background-color: var(--gray-100);
  color: var(--gray-800);
}
```

---

## 6. アニメーション・トランジション

### 6.1 基本トランジション
```css
/* 標準的な変化 */
.transition-standard {
  transition: all 0.2s ease-in-out;
}

/* 色の変化 */
.transition-colors {
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

/* 変形 */
.transition-transform {
  transition: transform 0.2s ease-in-out;
}

/* 影 */
.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}
```

### 6.2 ホバーエフェクト
```css
/* ボタンホバー */
.hover-lift:hover {
  transform: translateY(-1px);
}

/* カードホバー */
.hover-shadow:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* スケール */
.hover-scale:hover {
  transform: scale(1.02);
}
```

### 6.3 フェードイン
```css
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 6.4 ローディング
```css
.loading-spinner {
  border: 2px solid var(--gray-200);
  border-top: 2px solid var(--primary-blue);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

---

## 7. アイコンシステム

### 7.1 アイコンライブラリ
**Lucide React** を使用

### 7.2 アイコンサイズ
```css
--icon-xs: 12px;    /* w-3 h-3 */
--icon-sm: 16px;    /* w-4 h-4 */
--icon-md: 20px;    /* w-5 h-5 */
--icon-lg: 24px;    /* w-6 h-6 */
--icon-xl: 32px;    /* w-8 h-8 */
```

### 7.3 主要アイコン
```javascript
// ナビゲーション
ScrollText    // システムロゴ
FileText      // 売上伝票
ShoppingCart  // 仕入伝票
UserCircle2   // ユーザー

// アクション
Plus          // 追加
Edit          // 編集
Save          // 保存
Trash2        // 削除
Download      // ダウンロード
ArrowLeft     // 戻る

// 状態
TrendingUp    // 上昇
Users         // ユーザー数
Calendar      // 日付
Search        // 検索
X             // 閉じる
Check         // 確認
```

### 7.4 アイコン使用ルール
- **一貫性**: 同じ意味には同じアイコンを使用
- **サイズ**: コンテキストに応じた適切なサイズ
- **色**: テキストと同じ色を基本とする
- **配置**: テキストとの適切な間隔（0.5rem）

---

## 8. レスポンシブデザイン

### 8.1 デザイン原則
- **モバイルファースト**: 小画面から設計
- **プログレッシブエンハンスメント**: 段階的な機能向上
- **タッチフレンドリー**: 指での操作に適したサイズ

### 8.2 ブレークポイント戦略

#### モバイル（～640px）
- 単一カラムレイアウト
- ナビゲーションの簡素化
- タッチ操作に適したボタンサイズ（44px以上）
- カード形式のリスト表示

#### タブレット（641px～1024px）
- 2カラムレイアウト
- サイドバーの表示/非表示切り替え
- テーブルの横スクロール対応

#### デスクトップ（1025px～）
- フル機能表示
- サイドバー常時表示
- ホバーエフェクトの活用

### 8.3 タッチターゲット
```css
/* 最小タッチサイズ */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* ボタン間隔 */
.button-group > * + * {
  margin-left: 0.5rem;
}
```

---

## 9. アクセシビリティ

### 9.1 色覚対応
- **コントラスト比**: WCAG AA準拠（4.5:1以上）
- **色以外の情報**: アイコンやテキストで補完
- **色覚異常対応**: 赤緑色覚異常に配慮した色選択

### 9.2 キーボード操作
```css
/* フォーカス表示 */
.focus-visible {
  outline: 2px solid var(--primary-blue);
  outline-offset: 2px;
}

/* スキップリンク */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-blue);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
}

.skip-link:focus {
  top: 6px;
}
```

### 9.3 スクリーンリーダー対応
```html
<!-- 適切なラベル -->
<label for="customer-search">得意先検索</label>
<input id="customer-search" type="text" aria-describedby="search-help">
<div id="search-help">得意先名または製番で検索できます</div>

<!-- ランドマーク -->
<main role="main">
<nav role="navigation">
<aside role="complementary">

<!-- 状態の通知 -->
<div aria-live="polite" id="status"></div>
```

---

## 10. パフォーマンス最適化

### 10.1 CSS最適化
```css
/* CSSの最適化 */
.optimized {
  /* GPUアクセラレーション */
  transform: translateZ(0);
  
  /* レイアウトの最適化 */
  contain: layout style paint;
  
  /* 不要な再描画を避ける */
  will-change: transform;
}
```

### 10.2 画像最適化
- **WebP形式**: 対応ブラウザでの使用
- **適切なサイズ**: レスポンシブ画像の実装
- **遅延読み込み**: loading="lazy"の活用

### 10.3 フォント最適化
```css
/* フォント表示の最適化 */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;
}
```

---

## 11. ダークモード対応

### 11.1 カラーパレット（ダークモード）
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1F2937;      /* gray-800 */
    --bg-secondary: #374151;    /* gray-700 */
    --text-primary: #F9FAFB;    /* gray-50 */
    --text-secondary: #D1D5DB;  /* gray-300 */
    --border-color: #4B5563;    /* gray-600 */
  }
}
```

### 11.2 実装方針
- **システム設定優先**: prefers-color-scheme の尊重
- **手動切り替え**: ユーザーによる選択可能
- **状態保存**: ローカルストレージでの設定保存

---

## 12. ブランドガイドライン

### 12.1 ロゴ使用規定
- **最小サイズ**: 24px × 24px
- **余白**: ロゴの高さの1/2以上
- **背景**: 十分なコントラストの確保

### 12.2 トーン&マナー
- **プロフェッショナル**: 業務システムとしての信頼性
- **効率的**: 無駄のないシンプルなデザイン
- **親しみやすさ**: 使いやすさを重視した設計

### 12.3 写真・イラスト
- **Pexels**: 無料ストック写真の活用
- **一貫性**: 統一されたトーンの画像選択
- **品質**: 高解像度での提供

---

## 13. 実装ガイドライン

### 13.1 CSS設計手法
- **BEM記法**: Block__Element--Modifier
- **Tailwind CSS**: ユーティリティファーストの活用
- **カスタムプロパティ**: CSS変数での値管理

### 13.2 命名規則
```css
/* BEM記法の例 */
.invoice-table { }                    /* Block */
.invoice-table__header { }            /* Element */
.invoice-table__row--selected { }     /* Modifier */

/* Tailwind CSS カスタマイズ */
.btn-primary { @apply bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded; }
```

### 13.3 ファイル構成
```
styles/
├── base/
│   ├── reset.css
│   ├── typography.css
│   └── variables.css
├── components/
│   ├── buttons.css
│   ├── forms.css
│   ├── tables.css
│   └── cards.css
├── layout/
│   ├── header.css
│   ├── navigation.css
│   └── grid.css
└── utilities/
    ├── spacing.css
    ├── colors.css
    └── animations.css
```

---

## 14. 品質保証

### 14.1 デザインレビュー
- **一貫性チェック**: 全画面での統一性確認
- **アクセシビリティ監査**: WCAG準拠の確認
- **パフォーマンステスト**: 表示速度の測定

### 14.2 ブラウザ対応
- **Chrome**: 最新版
- **Firefox**: 最新版
- **Safari**: 最新版
- **Edge**: 最新版

### 14.3 デバイステスト
- **デスクトップ**: 1280px以上
- **タブレット**: 768px～1024px
- **モバイル**: 320px～767px

---

## 15. 保守・更新

### 15.1 デザインシステムの管理
- **バージョン管理**: 変更履歴の記録
- **ドキュメント更新**: 定期的な見直し
- **フィードバック収集**: ユーザーからの意見収集

### 15.2 継続的改善
- **ユーザビリティテスト**: 定期的な実施
- **アクセシビリティ監査**: 年次実施
- **パフォーマンス最適化**: 継続的な改善

---

この デザイン指示書は、Entry Core Billingシステムの一貫したデザイン品質を保つための包括的なガイドラインです。開発チーム全体でこの指示書を参照し、統一されたユーザーエクスペリエンスの提供を目指してください。