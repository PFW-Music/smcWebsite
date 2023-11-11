import NextAuth from "next-auth/next";
import AzureADProvider from "next-auth/providers/azure-ad";
export const options = {
    providers: [

         AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            tenantId: process.env.AZURE_AD_TENANT_ID,
           
            //version:"2.0",
            //wellKnown: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token?`,
            authorization: {
                
                params: {
                    //type: "oauth",
                    //version:"2.0",
                    //grant_type: "on_behalf_of",
                    scope:
                    "User.Read openid profile email offline_access",
                },
            },
             profile(profile, tokens) {
                 console.log("profile -----> ",profile);
                 return {
                     ...profile,
                     image: profile.picture,
                     role: profile.role ?? "user",
                     id: profile.sub,
                     jobTitle: profile.jobTitle ?? "No Job Title",
                     accessToken: tokens.access_token
                 }
               },
          }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            

          return { ...token, ...user };
        },
        async session({ session, token, user }) {
          session.user = token;
          return session;
        },

        async redirect({ url, baseUrl }) {
       
          return baseUrl
        }
      },
    
}

export default NextAuth(options);