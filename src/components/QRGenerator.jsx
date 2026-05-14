import { useRef, useState } from "react";
import {QRCodeCanvas} from 'qrcode.react'


const QRGenerator = () => {
    const qrRef = useRef()

    const [url, setUrl] = useState('https://portfolio.trailanderror.online')
    const [qrColor, setQrColor] = useState('#000000')
    const [bgColor, setBgColor] = useState("#ffffff");
    const [logo, setLogo] = useState(null);
    const [size, setSize] = useState(250);


    const handleLogoUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader()
        reader.onload = () => {
            setLogo(reader.result);
        }

        reader.readAsDataURL(file)
    }

    const downloadQR = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const url = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = url;
        link.download = 'qr-code.png';

        link.click();
    }

    return (
        <div className="bg-gray-100 flex items-center justify-center p-2 min-h-screen">
            <div className=" bg-white shadow-xl rounded-2xl pb-5 px-7">
            
                <h1 className="text-xl font-bold">
                    QR Generator
                </h1>

                <div className="flex flex-row gap-6">
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <label htmlFor="text" className="block text-sm font-medium mb-2">Website URL</label>

                            <input
                                type="text"
                                id='text'
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://portfolio.trailanderror.online"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div className="flex flex-row justify-around items-center">

                            <div className="mb-6">
                                <label
                                    htmlFor="qrColor"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    QR Color
                                </label>

                                <div className="flex items-center gap-2">
                                    <label
                                        htmlFor="qrColor"
                                        className="relative w-8 h-8 rounded-xl overflow-hidden border-2 border-gray-300 shadow-sm cursor-pointer hover:scale-105 transition"
                                    >
                                        <input
                                            type="color"
                                            id="qrColor"
                                            value={qrColor}
                                            onChange={(e) => setQrColor(e.target.value)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />

                                        <div
                                            className="w-full h-full"
                                            style={{ backgroundColor: qrColor }}
                                        />
                                    </label>

                                    <div className="flex-1">
                                        <div className="border border-gray-300 rounded-lg px-2 py-1 bg-gray-50 text-xs font-medium text-gray-700">
                                            {qrColor}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="mb-6">
                                <label
                                    htmlFor="bgColor"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Background Color
                                </label>

                                <div className="flex items-center gap-2">
                                    <label
                                        htmlFor="bgColor"
                                        className="relative w-8 h-8 rounded-xl overflow-hidden border-2 border-gray-300 shadow-sm cursor-pointer hover:scale-105 transition"
                                    >
                                        <input
                                            type="color"
                                            id="bgColor"
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />

                                        <div
                                            className="w-full h-full"
                                            style={{ backgroundColor: bgColor }}
                                        />
                                    </label>

                                    <div className="flex-1">
                                        <div className="border border-gray-300 rounded-lg px-2 py-1 bg-gray-50 text-xs font-medium text-gray-700">
                                            {bgColor}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">QR Size</label>

                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="150"
                                    max="400"
                                    value={size}
                                    onChange={(e) => setSize(Number(e.target.value))}
                                    className="w-full cursor-pointer"
                                />

                                <span className="text-sm font-semibold whitespace-nowrap">
                                    {size}px
                                </span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <label htmlFor="logo" className="block text-sm font-medium mb-2">Upload Logo</label>

                            <input
                                type="file"
                                id="logo"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="block w-full text-sm text-gray-600
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-black file:text-white
                                hover:file:bg-gray-800"
                            />
                        </div>
                    </div>

                    
                    <div className="flex justify-center mb-8">
                        <div
                            ref={qrRef}
                            className="p-5 rounded-2xl shadow-md text-center flex items-center justify-center"
                            style={{ backgroundColor: bgColor }}
                        >
                        <QRCodeCanvas
                            value={url}
                            size={size}
                            fgColor={qrColor}
                            bgColor={bgColor}
                            level="H"
                            includeMargin={true}
                            imageSettings={
                            logo
                                ? {
                                    src: logo,
                                    height: size * 0.2,
                                    width: size * 0.2,
                                    excavate: true,
                                }
                                : undefined
                            }
                        />
                        </div>
                    </div>
                </div>


                <button
                    type="button"
                    onClick={downloadQR}
                    className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300"
                >
                    Download QR
                </button>
            </div>
        </div>
    );
}

export default QRGenerator