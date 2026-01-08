import { ShoppingCart, Menu, User, LogOut, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/pranveda-logo.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartItemsCount, onCartClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <NavLink to="/">
              <img src={logo} alt="PRANVEDA" className="h-12 w-auto transition-transform hover:scale-105" />
            </NavLink>
            
            <div className="hidden md:flex items-center gap-6">
              <NavLink
                to="/"
                className="text-foreground hover:text-primary transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                activeClassName="text-primary"
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className="text-foreground hover:text-primary transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                activeClassName="text-primary"
              >
                Products
              </NavLink>
              <NavLink
                to="/about"
                className="text-foreground hover:text-primary transition-all duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                activeClassName="text-primary"
              >
                About Us
              </NavLink>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/orders')} className="cursor-pointer">
                    <Package className="h-4 w-4 mr-2" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
            )}
            
            <Button
              variant="outline"
              size="icon"
              className="relative transition-all duration-300 hover:scale-110 hover:shadow-lg"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="default" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse-glow"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden transition-all duration-300 hover:scale-110">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-8">
                  <NavLink
                    to="/"
                    className="text-lg text-foreground hover:text-primary transition-all duration-300 font-medium py-2 border-b border-border hover:translate-x-2"
                    activeClassName="text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/products"
                    className="text-lg text-foreground hover:text-primary transition-all duration-300 font-medium py-2 border-b border-border hover:translate-x-2"
                    activeClassName="text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Products
                  </NavLink>
                  <NavLink
                    to="/about"
                    className="text-lg text-foreground hover:text-primary transition-all duration-300 font-medium py-2 border-b border-border hover:translate-x-2"
                    activeClassName="text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    About Us
                  </NavLink>
                  
                  {user ? (
                    <>
                      <NavLink
                        to="/orders"
                        className="text-lg text-foreground hover:text-primary transition-all duration-300 font-medium py-2 border-b border-border hover:translate-x-2"
                        activeClassName="text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        My Orders
                      </NavLink>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}
                        className="text-lg text-destructive hover:text-destructive/80 transition-all duration-300 font-medium py-2 border-b border-border hover:translate-x-2 text-left"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <NavLink
                      to="/auth"
                      className="text-lg text-foreground hover:text-primary transition-all duration-300 font-medium py-2 border-b border-border hover:translate-x-2"
                      activeClassName="text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </NavLink>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
