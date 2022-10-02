package java_app;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
/**
 *
 * @author anik
 */
public class Login extends Application {
    
    @Override
    public void start(Stage stage) throws Exception {
        Parent root=FXMLLoader.load(getClass().getResource("FXML.fxml"));
        Scene scene=new Scene(root);
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
    
}
