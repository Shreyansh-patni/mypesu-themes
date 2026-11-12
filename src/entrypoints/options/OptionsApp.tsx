import React, { useState } from 'react';
import { usePreferences } from '../../hooks/usePreferences';
import { listThemes, getThemeDefinition } from '../../core/theme-registry';
import { BrandLogo } from '../../components/ui/brand-logo';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { ThemePreviewSwatches } from '../../components/ui/theme-preview';
import { ConfirmationDialog } from '../../components/ui/confirmation-dialog';
import {
  LayoutDashboard,
  Palette,
  SunMoon,
  Sliders,
  Info,
  Check,
  Sun,
  Moon,
  Monitor,
  RotateCcw,
  ShieldCheck,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import type {
  ThemeId,
  AppearanceMode,
  ExtensionUiAppearance,
  DensityMode,
  FontScale,
} from '../../core/types/preferences';

type NavSection = 'overview' | 'themes' | 'appearance' | 'preferences' | 'about';

export const OptionsApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>(() => {
    if (typeof window !== 'undefined') {
      const tab = new URLSearchParams(window.location.search).get('tab');
      if (tab && ['overview', 'themes', 'appearance', 'preferences', 'about'].includes(tab)) {
        return tab as NavSection;
      }
    }
    return 'overview';
  });
  const [isResetDialogOpen, setIsResetDialogOpen] = useState<boolean>(false);

  // Auto-scroll support for visual verification / deep-links
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const scrollParam = new URLSearchParams(window.location.search).get('scroll');
      if (scrollParam) {
        const timer = setTimeout(() => {
          const main = document.querySelector('main');
          if (main) {
            main.scrollTop = parseInt(scrollParam, 10) || 350;
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [activeSection]);

  const {
    preferences,
    loading,
    error,
    saveStatus,
    resolvedUiTheme,
    selectTheme,
    setPortalAppearance,
    setExtensionUiAppearance,
    setDensity,
    setFontScale,
    resetAllPreferences,
  } = usePreferences();

  const themes = listThemes();
  const currentTheme = getThemeDefinition(preferences.themeId);

  const handleConfirmReset = async () => {
    setIsResetDialogOpen(false);
    await resetAllPreferences();
  };

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden bg-[var(--background)] text-[var(--foreground)] font-sans flex flex-col md:flex-row transition-colors duration-200">
      {/* Reset Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isResetDialogOpen}
        title="Reset All Preferences to Factory Defaults?"
        description="This will restore all portal theme and extension UI preferences back to their factory defaults (Monochrome theme, System appearance, Comfortable density, 100% font scale). This action cannot be undone."
        confirmLabel="Reset to Defaults"
        cancelLabel="Cancel"
        isDestructive
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetDialogOpen(false)}
      />

      {/* 1. Left Sidebar Rail */}
      <aside className="w-full md:w-64 md:h-screen border-b md:border-b-0 md:border-r border-[var(--border)] bg-[var(--card)] p-4 flex flex-col shrink-0 md:overflow-y-auto">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[var(--border)]">
          <BrandLogo size={32} />
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-[var(--foreground)] m-0">
              MyPESU Themes
            </h1>
            <p className="text-[11px] text-[var(--muted-foreground)] m-0">
              Theme Studio
            </p>
          </div>
          <Badge variant="outline" className="ml-auto font-mono text-[10px]">
            v0.1.0
          </Badge>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'themes', label: 'Themes', icon: Palette },
            { id: 'appearance', label: 'Appearance', icon: SunMoon },
            { id: 'preferences', label: 'Preferences', icon: Sliders },
            { id: 'about', label: 'About', icon: Info },
          ].map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSection(id as NavSection)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer text-left ${
                  isActive
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Status */}
        <div className="pt-4 mt-4 border-t border-[var(--border)] text-[11px] text-[var(--muted-foreground)] space-y-1">
          <div className="flex items-center justify-between">
            <span>Storage Status:</span>
            <span className="font-medium text-[var(--foreground)]">
              {saveStatus === 'saved' ? 'Saved' : saveStatus === 'saving' ? 'Saving...' : 'Synced'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>UI Mode:</span>
            <span className="font-medium capitalize text-[var(--foreground)]">
              {resolvedUiTheme}
            </span>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Canvas */}
      <main className="flex-1 md:h-screen p-6 md:p-8 max-w-4xl overflow-y-auto">
        {/* Global Error Banner if any */}
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-[var(--destructive)]/10 text-[var(--destructive)] border border-[var(--destructive)]/20 text-xs flex items-center justify-between">
            <span>{error}</span>
            <Button size="sm" variant="outline" onClick={() => window.location.reload()}>
              Reload
            </Button>
          </div>
        )}

        {/* SECTION: OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                Theme Studio Overview
              </h2>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                Manage your customized PESU Academy visual presentation and extension settings.
              </p>
            </div>

            {/* Quick Status Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-[11px]">Selected Portal Theme</CardDescription>
                  <CardTitle className="text-base capitalize">{preferences.themeId}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[11px] text-[var(--muted-foreground)]">
                    {currentTheme.name}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-[11px]">Portal Mode</CardDescription>
                  <CardTitle className="text-base capitalize">{preferences.appearanceMode}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[11px] text-[var(--muted-foreground)]">
                    Target: pesuacademy.com
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-[11px]">Extension UI Appearance</CardDescription>
                  <CardTitle className="text-base capitalize">{preferences.extensionUiAppearance}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[11px] text-[var(--muted-foreground)]">
                    Resolved: {resolvedUiTheme}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-[11px]">Display Scale & Density</CardDescription>
                  <CardTitle className="text-base">{preferences.fontScale}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[11px] text-[var(--muted-foreground)] capitalize">
                    {preferences.density} density
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Two Independent Appearance Systems Explanation */}
            <Card className="bg-[var(--accent)]/30 border-[var(--border)]">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[var(--primary)]" />
                  <CardTitle className="text-sm">Two Independent Appearance Systems</CardTitle>
                </div>
                <CardDescription className="text-xs leading-relaxed mt-1">
                  MyPESU Themes strictly separates your extension configuration into two decoupled subsystems:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="p-2.5 rounded bg-[var(--card)] border border-[var(--border)]">
                  <span className="font-semibold text-[var(--foreground)]">1. Extension UI Appearance: </span>
                  Controls the dark/light scheme of this Theme Studio and the extension popup. Changing it never modifies the portal.
                </div>
                <div className="p-2.5 rounded bg-[var(--card)] border border-[var(--border)]">
                  <span className="font-semibold text-[var(--foreground)]">2. PESU Portal Appearance: </span>
                  Controls how the theme colors are applied when viewing the university portal (<code className="text-[11px]">pesuacademy.com</code>). Changing it never affects your extension interface.
                </div>
              </CardContent>
            </Card>

            {/* Active Theme Preview Banner */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm">Active Theme Palette: {currentTheme.name}</CardTitle>
                    <CardDescription className="text-xs">{currentTheme.description}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveSection('themes')}>
                    Browse All Themes
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ThemePreviewSwatches theme={currentTheme} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* SECTION: THEMES */}
        {activeSection === 'themes' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                Curated Theme Packs
              </h2>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                Choose an audited, accessible design language for the PESU Academy portal.
              </p>
            </div>

            {/* Stage 6A Status Notice */}
            <div className="p-3 rounded-md bg-[var(--muted)]/50 border border-[var(--border)] text-xs text-[var(--muted-foreground)]">
              <span className="font-semibold text-[var(--foreground)]">Stage 6A Status: </span>
              Your theme selection is saved locally. Live CSS injection into PESU Academy portal pages begins in Stage 6B.
            </div>

            {/* Theme Cards Grid */}
            <div className="grid grid-cols-1 gap-6">
              {themes.map((theme) => {
                const isSelected = preferences.themeId === theme.id;
                return (
                  <Card
                    key={theme.id}
                    className={`transition-all duration-200 ${
                      isSelected
                        ? 'border-[var(--primary)] ring-1 ring-[var(--primary)] shadow-sm'
                        : 'border-[var(--border)]'
                    }`}
                  >
                    <CardHeader className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{theme.name}</CardTitle>
                          {isSelected && (
                            <Badge variant="active" className="flex items-center gap-1">
                              <Check className="w-3 h-3" /> Active Theme
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-xs mt-1">
                          {theme.description}
                        </CardDescription>
                      </div>

                      <Button
                        variant={isSelected ? 'secondary' : 'default'}
                        size="sm"
                        onClick={() => selectTheme(theme.id as ThemeId)}
                        disabled={isSelected}
                        className="shrink-0"
                      >
                        {isSelected ? 'Selected' : 'Apply Theme'}
                      </Button>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Palette Preview Swatches */}
                      <div>
                        <h4 className="text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                          Color Token Palette
                        </h4>
                        <ThemePreviewSwatches theme={theme} />
                      </div>

                      {/* Token Details Table */}
                      <div className="p-3 rounded-md bg-[var(--muted)]/40 border border-[var(--border)] text-xs grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div>
                          <span className="text-[10px] text-[var(--muted-foreground)] block">Light Canvas</span>
                          <span className="font-mono text-[11px]">{theme.modes.light.colors.canvas}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[var(--muted-foreground)] block">Light Accent</span>
                          <span className="font-mono text-[11px]">{theme.modes.light.colors.accent}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[var(--muted-foreground)] block">Dark Canvas</span>
                          <span className="font-mono text-[11px]">{theme.modes.dark.colors.canvas}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[var(--muted-foreground)] block">Dark Accent</span>
                          <span className="font-mono text-[11px]">{theme.modes.dark.colors.accent}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION: APPEARANCE */}
        {activeSection === 'appearance' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                Appearance Settings
              </h2>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                Configure color mode preferences independently for the extension and the university portal.
              </p>
            </div>

            {/* 1. Extension UI Appearance */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <SunMoon className="w-4 h-4 text-[var(--primary)]" />
                  <CardTitle className="text-sm">Extension Interface Appearance</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Controls the color mode of this Theme Studio and the Extension Popup.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'system', label: 'System (Auto)', icon: Monitor, desc: 'Follows operating system dark/light mode' },
                    { id: 'light', label: 'Light', icon: Sun, desc: 'Always use clean light surfaces' },
                    { id: 'dark', label: 'Dark', icon: Moon, desc: 'Always use low-strain dark surfaces' },
                  ].map(({ id, label, icon: Icon, desc }) => {
                    const isSelected = preferences.extensionUiAppearance === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setExtensionUiAppearance(id as ExtensionUiAppearance)}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[var(--primary)] bg-[var(--accent)]/50 ring-1 ring-[var(--primary)] shadow-xs'
                            : 'border-[var(--border)] hover:bg-[var(--accent)]/20'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <Icon className="w-4 h-4 text-[var(--foreground)]" />
                          {isSelected && <Check className="w-3.5 h-3.5 text-[var(--foreground)]" />}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[var(--foreground)]">{label}</div>
                          <div className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="text-xs text-[var(--muted-foreground)] pt-1">
                  Current effective UI theme: <span className="font-semibold text-[var(--foreground)] capitalize">{resolvedUiTheme}</span>
                </div>
              </CardContent>
            </Card>

            {/* 2. PESU Portal Appearance */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-[var(--primary)]" />
                  <CardTitle className="text-sm">PESU Portal Appearance</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Controls the theme appearance mode when browsing <code className="text-[11px]">https://www.pesuacademy.com/*</code>.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'system', label: 'System (Auto)', icon: Monitor, desc: 'Aligns portal colors with your system preference' },
                    { id: 'light', label: 'Light', icon: Sun, desc: 'Renders the selected theme in light palette mode' },
                    { id: 'dark', label: 'Dark', icon: Moon, desc: 'Renders the selected theme in dark palette mode' },
                  ].map(({ id, label, icon: Icon, desc }) => {
                    const isSelected = preferences.appearanceMode === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPortalAppearance(id as AppearanceMode)}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[var(--primary)] bg-[var(--accent)]/50 ring-1 ring-[var(--primary)] shadow-xs'
                            : 'border-[var(--border)] hover:bg-[var(--accent)]/20'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <Icon className="w-4 h-4 text-[var(--foreground)]" />
                          {isSelected && <Check className="w-3.5 h-3.5 text-[var(--foreground)]" />}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[var(--foreground)]">{label}</div>
                          <div className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="text-xs text-[var(--muted-foreground)] pt-1">
                  Active portal mode: <span className="font-semibold text-[var(--foreground)] capitalize">{preferences.appearanceMode}</span> (Independent from Extension UI)
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* SECTION: PREFERENCES */}
        {activeSection === 'preferences' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                Readability & Display Preferences
              </h2>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                Customize information density and text scaling for improved legibility.
              </p>
            </div>

            {/* Display Density */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Information Density</CardTitle>
                <CardDescription className="text-xs">
                  Adjust padding and line spacing across tables and card layouts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'comfortable', label: 'Comfortable', desc: 'Standard breathing room and balanced spacing' },
                    { id: 'compact', label: 'Compact', desc: 'Higher data density for tables, schedules, and listings' },
                  ].map(({ id, label, desc }) => {
                    const isSelected = preferences.density === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setDensity(id as DensityMode)}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[var(--primary)] bg-[var(--accent)]/50 ring-1 ring-[var(--primary)] shadow-xs'
                            : 'border-[var(--border)] hover:bg-[var(--accent)]/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold">{label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <p className="text-[10px] text-[var(--muted-foreground)]">{desc}</p>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Font Scaling */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Font Scaling</CardTitle>
                <CardDescription className="text-xs">
                  Scale portal typography within WCAG-tested boundaries (100% to 120%).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--muted-foreground)]">Current Scale:</span>
                  <span className="font-semibold text-sm">{preferences.fontScale}%</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {([100, 105, 110, 115, 120] as FontScale[]).map((scale) => {
                    const isSelected = preferences.fontScale === scale;
                    return (
                      <button
                        key={scale}
                        type="button"
                        onClick={() => setFontScale(scale)}
                        className={`py-2 px-1 text-center rounded-md border text-xs font-medium cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)] shadow-xs'
                            : 'border-[var(--border)] hover:bg-[var(--accent)]'
                        }`}
                      >
                        {scale}%
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Accessibility Standard Compliance */}
            <Card className="bg-[var(--muted)]/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--foreground)]" />
                  <CardTitle className="text-sm">Accessibility Standard: WCAG 2.2 AA</CardTitle>
                </div>
                <CardDescription className="text-xs leading-relaxed mt-1">
                  All color combinations in both Monochrome and Apple-Inspired themes have been audited to guarantee a minimum 4.5:1 contrast ratio for body text against their rendered backgrounds.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Danger Zone: Factory Reset */}
            <Card className="border-[var(--destructive)]/30">
              <CardHeader>
                <CardTitle className="text-sm text-[var(--destructive)]">Danger Zone</CardTitle>
                <CardDescription className="text-xs">
                  Restore all extension preferences to their factory defaults.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsResetDialogOpen(true)}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Preferences to Defaults</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* SECTION: ABOUT */}
        {activeSection === 'about' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                About MyPESU Themes
              </h2>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                Architecture, licensing, and privacy boundaries.
              </p>
            </div>

            <Card>
              <CardContent className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <BrandLogo size={64} />
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-base font-bold text-[var(--foreground)]">
                    MyPESU Themes
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Your Academy. Your Style.
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                    <Badge variant="outline">Version 0.1.0</Badge>
                    <Badge variant="outline">Manifest V3</Badge>
                    <Badge variant="outline">Chrome & Firefox</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Independent Disclaimer */}
            <Card className="bg-[var(--muted)]/30">
              <CardHeader>
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                  Independent Unofficial Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-[var(--muted-foreground)] space-y-2 leading-relaxed">
                <p>
                  MyPESU Themes is an independent, open-source personal appearance customization tool for students.
                  It is not affiliated with, endorsed by, or sponsored by PES University, PESU Academy, or their parent organizations.
                </p>
                <p>
                  The compass mark is derived from original black-and-white navigational geometry and does not reproduce university crests, trademarks, or official endorsements.
                </p>
              </CardContent>
            </Card>

            {/* Privacy & Safety Invariants */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--foreground)]" />
                  <CardTitle className="text-sm">Privacy & Safety Invariants</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--foreground)] shrink-0 mt-0.5" />
                  <span><strong>100% Local-First:</strong> All settings are saved exclusively in your browser's local storage. Zero analytics, zero telemetry, zero external network traffic.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--foreground)] shrink-0 mt-0.5" />
                  <span><strong>Presentation Only:</strong> Modifies visual presentation only. Strictly zero access to academic grades, attendance calculations, forms, or student submissions.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--foreground)] shrink-0 mt-0.5" />
                  <span><strong>Consequential Exclusions:</strong> Sensitive flows (<code className="text-[11px]">/feePayment*</code>, <code className="text-[11px]">/exam*</code>, <code className="text-[11px]">/login*</code>) remain 100% untouched.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--foreground)] shrink-0 mt-0.5" />
                  <span><strong>Minimal Permissions:</strong> Manifest permissions restricted strictly to <code className="text-[11px]">["storage"]</code> and host match <code className="text-[11px]">["https://www.pesuacademy.com/*"]</code>.</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};
