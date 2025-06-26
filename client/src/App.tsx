import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { Navigation } from "./components/Navigation";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { AdminLogin } from "./pages/AdminLogin";
import "./index.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground">
        <Switch>
          {/* Admin Login Route - No Navigation */}
          <Route path="/admin">
            <AdminLogin />
          </Route>
          
          {/* Main Portfolio Routes - With Navigation */}
          <Route>
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
              <div className="max-w-7xl mx-auto px-6 py-4">
                <Navigation />
              </div>
            </div>
            
            <main>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/blogs" component={Blog} />
                <Route path="/blog/:slug">
                  {(params) => <BlogPost slug={params.slug} />}
                </Route>
                <Route path="/about" component={About} />
                <Route path="/skills" component={Skills} />
                <Route path="/projects" component={Projects} />
                <Route path="/experience" component={Experience} />
                <Route path="/contact" component={Contact} />
                <Route component={NotFound} />
              </Switch>
            </main>
          </Route>
        </Switch>
      </div>
    </QueryClientProvider>
  );
}

// Placeholder components for other pages
function BlogPost({ slug }: { slug: string }) {
  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Blog Post: {slug}</h1>
        <p className="text-muted-foreground">Blog post content will be loaded here.</p>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About</h1>
        <p className="text-muted-foreground">About page content will be loaded here.</p>
      </div>
    </div>
  );
}

function Skills() {
  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Skills & Certifications</h1>
        <p className="text-muted-foreground">Skills page content will be loaded here.</p>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Projects</h1>
        <p className="text-muted-foreground">Projects page content will be loaded here.</p>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Experience</h1>
        <p className="text-muted-foreground">Experience page content will be loaded here.</p>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact</h1>
        <p className="text-muted-foreground">Contact page content will be loaded here.</p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Page not found</p>
        <a href="/" className="text-primary hover:underline">
          Return to Home
        </a>
      </div>
    </div>
  );
}

export default App;