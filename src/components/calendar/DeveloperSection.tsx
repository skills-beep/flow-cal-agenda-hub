
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const DeveloperSection = () => {
  return (
    <Card className="border-0 shadow-none bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500 animate-pulse" />
          <CardTitle className="text-lg font-semibold">Meet the Developer</CardTitle>
        </div>
        <CardDescription className="text-sm leading-relaxed">
          Passionate about crafting beautiful and intuitive user experiences. 
          I love bringing designs to life with clean code and thoughtful interactions.
        </CardDescription>
      </CardHeader>
      
      <Separator className="mx-6" />
      
      <CardContent className="pt-4 space-y-3">
        <div className="flex flex-col gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="justify-start h-10 px-3 text-sm hover:bg-primary/10"
            onClick={() => window.open('https://www.linkedin.com/in/bishal-sharma-12b7211b6/', '_blank')}
          >
            <Linkedin className="h-4 w-4 mr-3 text-blue-600" />
            LinkedIn Profile
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="justify-start h-10 px-3 text-sm hover:bg-primary/10"
            onClick={() => window.open('https://github.com/skills-beep', '_blank')}
          >
            <Github className="h-4 w-4 mr-3" />
            GitHub Projects
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="justify-start h-10 px-3 text-sm hover:bg-primary/10"
            onClick={() => window.open('mailto:bishalsharma153@gmail.com', '_blank')}
          >
            <Mail className="h-4 w-4 mr-3 text-green-600" />
            Email Me
          </Button>
        </div>
        
        <div className="pt-3 text-center">
          <p className="text-sm text-muted-foreground font-medium">
            Built with ❤️ for better productivity
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
