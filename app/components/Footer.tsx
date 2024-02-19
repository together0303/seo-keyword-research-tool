
function Footer() {
    return <div className="py-6 px-4 w-full bg-surface flex justify-center items-center mx-auto">
        <div className="w-full max-w-lg flex justify-between">
            <p className="text-sm text-secondary">© 2023 Rankulate. All rights reserved</p>
            <div className="flex gap-4 justify-center items-center">
                <a href="#" className="text-sm font-medium text-brand-400">Terms of Services</a>
                <a href="#" className="text-sm font-medium text-brand-400">Privacy policy</a>
            </div>
        </div>
    </div>
}

export default Footer;