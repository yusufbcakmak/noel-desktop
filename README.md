# ChristmasDesktop

A festive, cross-platform desktop application built with Electron.js.

## Features

- **Draggable Christmas Tree**: A transparent, frameless window with a festive tree that you can place anywhere on your screen.
- **Realistic Snow Effect**: A full-screen, click-through overlay that brings snowfall to your desktop without getting in your way.
- **System Tray Control**: Manage the app from your system tray/menu bar.
  - Toggle Tree on/off.
  - Toggle Snow on/off.
  - Toggle Tree Always On Top.
  - Control Music (Play/Pause, Volume).
  - Adjust Snow properties (Density, Speed) instantly.

## Screenshots

| Windows | macOS |
|:---:|:---:|
| ![Windows Screenshot](assets/screenshot-win.png) | ![macOS Screenshot](assets/screenshot-mac.png) |

## Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

Start the application:

```bash
npm start
```

## Structure

- **main.js**: Main process, handles window creation and system tray.
- **src/tree/**: Renderer files for the draggable tree window.
- **src/snow/**: Renderer files for the canvas-based snow effect.
- **assets/**: Contains application icons and images.

## Packaging

To package the application as an executable (.exe) or app bundle (.app):

1.  Install electron-builder:
    ```bash
    npm install --save-dev electron-builder
    ```

2.  Build for Windows:
    ```bash
    npx electron-builder --win
    ```

3.  Build for macOS:
    ```bash
    npx electron-builder --mac
    ```




Electron.js ile oluşturulmuş, yılbaşı ruhunu masaüstünüze getiren eğlenceli ve çapraz platform bir uygulama.

## Özellikler

- **Sürüklenebilir Noel Ağacı**: Ekranınızın dilediğiniz köşesine yerleştirebileceğiniz, şeffaf ve çerçevesiz bir Noel ağacı.
- **Gerçekçi Kar Efekti**: Ekranı kaplayan ancak fare tıklamalarını engellemeyen (click-through), ayarlanabilir bir kar yağışı efekti.
- **Sistem Tepsisi Kontrolü**: Uygulamayı doğrudan sistem tepsisinden yönetebilirsiniz:
  - Ağacı Gizle/Göster
  - Kar Efektini Aç/Kapat
  - Ağacın Her Zaman Üstte Olmasını Aç/Kapat
  - Müzik Kontrolü
  - Kar Yoğunluğu ve Hız Ayarları

## Ekran Görüntüleri

| Windows | macOS |
|:---:|:---:|
| ![Windows Screenshot](assets/screenshot-win.png) | ![macOS Screenshot](assets/screenshot-mac.png) |

## Kurulum

1. Projeyi bilgisayarınıza klonlayın.
2. Gerekli paketleri yükleyin:
    ```bash
    npm install
    ```

## Kullanım

Uygulamayı başlatmak için:
```bash
npm start
```

## Proje Yapısı

- **main.js**: Ana işlem dosyası; pencere yönetimi ve sistem tepsisi işlemlerini yürütür.
- **src/tree/**: Sürüklenebilir ağaç penceresi için arayüz dosyaları.
- **src/snow/**: Kar efekti için canvas tabanlı arayüz dosyaları.
- **assets/**: İkonlar ve görsel dosyalar.

## Paketleme (Dağıtım)

Uygulamayı Windows (.exe) veya macOS (.app) formatında paketlemek için:

1.  electron-builder paketini yükleyin:
    ```bash
    npm install --save-dev electron-builder
    ```

2.  Windows için çıktı al:
    ```bash
    npx electron-builder --win
    ```

3.  macOS için çıktı al:
    ```bash
    npx electron-builder --mac
    ```


