export default function Footer() {
    return (
        <footer className="bg-custom-blue-500 py-6">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center">
                    <p className="text-white text-sm font-bold">
                    Sanja Šajfar, diplomski rad © {new Date().getFullYear()} 
                    </p>
                </div>
            </div>
        </footer>
    );
}
