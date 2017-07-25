import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.eclipse.jetty.http.HttpStatus;
import spark.utils.StringUtils;

import static spark.Spark.get;
import static spark.Spark.post;

public class Main {
    public static void main(String[] args) {
        get("/", (request, response) -> {
            System.out.println("===============================================================");
            System.out.println("URL: " + request.url());
            System.out.println("Query Params: " + request.queryParams("challenge"));
            System.out.println("===============================================================");
            String challenge = request.queryParams("challenge");
            if (StringUtils.isEmpty(challenge)) {
                response.status(HttpStatus.BAD_REQUEST_400);
                return "";
            }
            response.status(200);
            return challenge;
        });

        post("/", (request, response) -> {
            String message = request.body();
            System.out.println("===============================================================");
            System.out.println("URL: " + request.url());
            System.out.println("Body: " + message);
            JsonObject output = new JsonParser().parse(message).getAsJsonObject();
            System.out.println("Parsed Message: " + output);
            System.out.println("===============================================================");
            response.status(200);
            return "OK";
        });
    }
}