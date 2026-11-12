import React from 'react';
import { browser } from 'wxt/browser';
import { usePreferences } from '../../hooks/usePreferences';
import { listThemes } from '../../core/theme-registry';
import { BrandLogo } from '../../components/ui/brand-logo';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ThemePreviewSwatches } from '../../components/ui/theme-preview';
import {
  Settings,
  Sun,
  Moon,
  Monitor,
  Check,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import type { AppearanceMode, DensityMode, FontScale, ThemeId } from '../../core/types/preferences';

export const PopupApp: React.FC = () => {
  const {
    preferences,
    loading,
    error,
    saveStatus,
    resolvedUiTheme,
    selectTheme,
    setPortalAppearance,
    setDensity,
    setFontScale,
  } = usePreferences();

  const themes = listThemes();

  const handleOpenOptions = () => {
    try {
      if (typeof browser !== 'undefined' && browser.runtime?.openOptionsPage) {
        browser.runtime.openOptionsPage();
      } else if (typeof chrome !== 'undefined' && chrome.runtime?.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open('options.html', '_blank');
      }
    } catch {
      window.open('options.html', '_blank');
    }
  };

  return (
    <main
      className="w-[360px] max-w-[400px] min-w-[320px] max-h-[580px] flex flex-col bg-[var(--card)] text-[var(--card-foreground)] font-sans text-xs leading-normal select-none overflow-hidden transition-colors duration-200"
      aria-label="MyPESU Themes Extension Popup"
    >
      {/* 1. Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--background)] shrink-0">
        <div className="flex items-center gap-2.5">
          <BrandLogo size={24} />
          <div>
            <h1 className="text-xs font-semibold tracking-tight leading-tight m-0 text-[var(--foreground)]">
              MyPESU Themes
            </h1>
            <p className="text-[10px] text-[var(--muted-foreground)] m-0 leading-none mt-0.5">
              Your Academy. Your Style.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {saveStatus === 'saved' && (
            <span className="text-[10px] font-medium text-[var(--muted-foreground)] px-1.5 py-0.5 rounded animate-fade-in">
              Saved
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleOpenOptions}
            title="Open Theme Studio"
            aria-label="Open Theme Studio Options Page"
            className="h-7 w-7 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            <Settings className="w-3.5 h-3.5" />
          </Button>
        </div>
      </header>

      {/* 2. Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Error Alert */}
        {error && (
          <div className="p-2 rounded-md bg-[var(--destructive)]/10 text-[var(--destructive)] border border-[var(--destructive)]/20 text-[11px] flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Integration Status Notice */}
        <section
          aria-label="Integration Status"
          className="p-2 rounded-md bg-[var(--muted)]/50 border border-[var(--border)] flex items-start gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--foreground)] mt-1 shrink-0 opacity-75" />
          <div className="flex-1 text-[11px] leading-tight text-[var(--muted-foreground)]">
            <span className="font-semibold text-[var(--foreground)]">Local Preferences Active. </span>
            PESU Academy portal styling engine connects in Stage 6B.
          </div>
        </section>

        {/* Active Theme Selector */}
        <section aria-labelledby="theme-section-title" className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 id="theme-section-title" className="text-[11px] font-semibold text-[var(--foreground)] uppercase tracking-wider">
              Active Portal Theme
            </h2>
            <span className="text-[10px] text-[var(--muted-foreground)] capitalize">
              {preferences.themeId}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {themes.map((theme) => {
              const isSelected = preferences.themeId === theme.id;
              return (
                <div
                  key={theme.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => selectTheme(theme.id as ThemeId)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      selectTheme(theme.id as ThemeId);
                    }
                  }}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'border-[var(--primary)] bg-[var(--accent)]/40 shadow-xs ring-1 ring-[var(--primary)]'
                      : 'border-[var(--border)] bg-[var(--card)] hover:bg-[var(--accent)]/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-[11px] text-[var(--foreground)]">
                      {theme.name}
                    </span>
                    {isSelected ? (
                      <Badge variant="active" className="flex items-center gap-1 text-[9px] py-0 px-1.5">
                        <Check className="w-2.5 h-2.5" /> Active
                      </Badge>
                    ) : (
                      <span className="text-[10px] text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                        Select
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[var(--muted-foreground)] mb-2 line-clamp-1">
                    {theme.description}
                  </p>
                  <ThemePreviewSwatches theme={theme} compact />
                </div>
              );
            })}
          </div>
        </section>

        {/* PESU Portal Appearance Mode */}
        <section aria-labelledby="appearance-section-title" className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h2 id="appearance-section-title" className="text-[11px] font-semibold text-[var(--foreground)] uppercase tracking-wider">
              Portal Appearance
            </h2>
            <span className="text-[10px] text-[var(--muted-foreground)]">
              (pesuacademy.com)
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1 bg-[var(--muted)]/50 p-1 rounded-md border border-[var(--border)]">
            {[
              { id: 'system', label: 'System', icon: Monitor },
              { id: 'light', label: 'Light', icon: Sun },
              { id: 'dark', label: 'Dark', icon: Moon },
            ].map(({ id, label, icon: Icon }) => {
              const active = preferences.appearanceMode === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPortalAppearance(id as AppearanceMode)}
                  className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-[var(--background)] text-[var(--foreground)] shadow-xs border border-[var(--border)]'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                  }`}
                  aria-pressed={active}
                >
                  <Icon className="w-3 h-3" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Quick Readability Controls */}
        <section aria-labelledby="readability-section-title" className="space-y-2 pt-1 border-t border-[var(--border)]">
          <h2 id="readability-section-title" className="text-[11px] font-semibold text-[var(--foreground)] uppercase tracking-wider">
            Quick Readability
          </h2>

          {/* Density */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[var(--muted-foreground)]">Table Density</span>
            <div className="flex items-center gap-1">
              {(['comfortable', 'compact'] as DensityMode[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDensity(d)}
                  className={`px-2 py-1 rounded text-[10px] font-medium capitalize transition-colors cursor-pointer border ${
                    preferences.density === d
                      ? 'bg-[var(--secondary)] text-[var(--secondary-foreground)] border-[var(--primary)]/40 font-semibold'
                      : 'bg-transparent border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Font Scale */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[var(--muted-foreground)]">Text Scale</span>
            <div className="flex items-center gap-1">
              {([100, 110, 120] as FontScale[]).map((scale) => (
                <button
                  key={scale}
                  type="button"
                  onClick={() => setFontScale(scale)}
                  className={`px-2 py-1 rounded text-[10px] font-medium transition-colors cursor-pointer border ${
                    preferences.fontScale === scale
                      ? 'bg-[var(--secondary)] text-[var(--secondary-foreground)] border-[var(--primary)]/40 font-semibold'
                      : 'bg-transparent border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {scale}%
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 3. Footer */}
      <footer className="p-3 border-t border-[var(--border)] bg-[var(--muted)]/20 shrink-0 space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleOpenOptions}
          className="w-full flex items-center justify-center gap-1.5 h-8 text-[11px]"
        >
          <span>Open Full Theme Studio</span>
          <ExternalLink className="w-3 h-3" />
        </Button>
        <div className="flex items-center justify-between text-[10px] text-[var(--muted-foreground)] px-0.5">
          <span>Extension UI: {preferences.extensionUiAppearance} ({resolvedUiTheme})</span>
          <span className="font-mono">v0.1.0</span>
        </div>
      </footer>
    </main>
  );
};
