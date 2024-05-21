import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authMiddleware } from "../middleware/authMiddleware";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", authMiddleware);

blogRouter.post("/", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    return c.json({
      id: post.id,
    });
  } catch (error) {
    c.status(403);
    return c.json({
      error: "error while posting",
    });
  }
});

blogRouter.put("/", async (c) => {
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const postDetails = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      message: "post updated successfully",
      id: postDetails.id,
    });
  } catch (error) {}
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        publishedAt: true,
        author: {
          select: {
            name: true,
          },
        },
        likes: {
          select: {
            id: true,
          },
        },
        reads: {
          select: {
            id: true,
          },
        },
        comments: {
          select: {
            id: true,
            text: true,
            createdAt: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        images: {
          select: {
            id: true,
            url: true,
            altText: true,
          },
        },
      },
    });
    return c.json({
      blogs,
    });
  } catch (error) {
    c.status(500);
    return c.text("Invalid request or error");
  }
});

// blogRouter.get("/bulk", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   try {
//     const blogs = await prisma.post.findMany({
//       select: {
//         content: true,
//         title: true,
//         id: true,
//         author: {
//           select: {
//             name: true,
//           },
//         },
//       },
//     });
//     return c.json({
//       blogs,
//     });
//   } catch (error) {
//     c.status(500);
//     return c.text("invalid request or error");
//   }
// });

// blogRouter.get("/:id", async (c) => {
//   const id = c.req.param("id");

//   const prisma = new PrismaClient({
//     datasourceUrl: c.env?.DATABASE_URL,
//   }).$extends(withAccelerate());

//   try {
//     const blog = await prisma.post.findFirst({
//       where: {
//         id: id,
//       },
//       select: {
//         id: true,
//         title: true,
//         content: true,
//         author: {
//           select: {
//             name: true,
//           },
//         },
//       },
//     });

//     return c.json({
//       blog,
//     });
//   } catch (error) {
//     c.status(403);
//     return c.text("invalid request or error");
//   }
// });

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        publishedAt: true,
        author: {
          select: {
            name: true,
          },
        },
        likes: {
          select: {
            id: true,
          },
        },
        reads: {
          select: {
            id: true,
          },
        },
        comments: {
          select: {
            id: true,
            text: true,
            createdAt: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        images: {
          select: {
            id: true,
            url: true,
            altText: true,
          },
        },
      },
    });

    return c.json({
      blog,
    });
  } catch (error) {
    c.status(403);
    return c.text("Invalid request or error");
  }
});

blogRouter.post("/:postId/like", async (c) => {
  const userId = c.get("userId");
  const postId = c.req.param("postId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const like = await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });

    return c.json({
      message: "Post liked successfully",
      like,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Error liking the post",
    });
  }
});

blogRouter.post("/:postId/comment", async (c) => {
  const userId = c.get("userId");
  const postId = c.req.param("postId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const comment = await prisma.comment.create({
      data: {
        postId,
        userId,
        text: body.text,
      },
    });

    return c.json({
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Error adding comment",
    });
  }
});

blogRouter.post("/:postId/read", async (c) => {
  const userId = c.get("userId");
  const postId = c.req.param("postId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const read = await prisma.read.create({
      data: {
        postId,
        userId,
      },
    });

    return c.json({
      message: "Post marked as read",
      read,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Error marking post as read",
    });
  }
});

// Route to upload an image and associate it with a post
blogRouter.post("/:postId/image", async (c) => {
  const userId = c.get("userId");
  const postId = c.req.param("postId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const formData = await c.req.formData();
    const file = formData.get("file");
    const altText = formData.get("altText");

    if (!file || !(file instanceof File)) {
      c.status(400);
      return c.json({ error: "Invalid file upload" });
    }

    // Assuming you have a function to handle the actual file upload to your storage service
    const imageUrl = await uploadFileToStorage(file);

    const image = await prisma.image.create({
      data: {
        url: imageUrl,
        altText: altText?.toString() || null,
        postId,
      },
    });

    return c.json({
      message: "Image uploaded successfully",
      image,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Error uploading image",
    });
  }
});

// Placeholder function for file upload, replace with actual implementation
async function uploadFileToStorage(file: File): Promise<string> {
  // Implement file upload logic to your preferred storage (e.g., Cloudflare R2, AWS S3)
  // Return the URL of the uploaded file
  const imageUrl = "https://your-storage-service.com/path-to-uploaded-file";
  return imageUrl;
}
